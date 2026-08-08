import {
	ApplicationError,
	NodeApiError,
	NodeOperationError,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IWebhookFunctions,
	ITriggerFunctions,
	IPollFunctions,
	IHttpRequestOptions,
	IDataObject,
	JsonObject,
} from 'n8n-workflow';

export type EasybillThis =
	| IExecuteFunctions
	| ILoadOptionsFunctions
	| IHookFunctions
	| IWebhookFunctions
	| ITriggerFunctions
	| IPollFunctions;

/**
 * Native DATE formatter (Europe/Berlin, YYYY-MM-DD)
 */
export function formatEasybillDate(input: string | Date): string {
	const d = new Date(input);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

/**
 * Native DATETIME formatter (Europe/Berlin, YYYY-MM-DD HH:mm:ss)
 */
export function formatEasybillDateTime(input: string | Date): string {
	const d = new Date(input);

	// Konvertierung in Europe/Berlin — manuell, ohne externe Libs
	const berlinOffset = -new Date().getTimezoneOffset() / 60; // in Stunden
	const utc = d.getTime() + d.getTimezoneOffset() * 60000; // UTC millisekunden
	const berlin = new Date(utc + berlinOffset * 3600000);

	const year = berlin.getFullYear();
	const month = String(berlin.getMonth() + 1).padStart(2, '0');
	const day = String(berlin.getDate()).padStart(2, '0');
	const hour = String(berlin.getHours()).padStart(2, '0');
	const minute = String(berlin.getMinutes()).padStart(2, '0');
	const second = String(berlin.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * Normalize endpoint → must ALWAYS be relative
 */
export function normalizeEndpoint(endpoint: string): string {
	if (!endpoint || typeof endpoint !== 'string') {
		throw new ApplicationError(`Invalid endpoint provided: "${endpoint}". Must be a non-empty string.`);
	}

	const clean = endpoint.trim();

	if (/^https?:\/\//i.test(clean)) {
		throw new ApplicationError(
			`Invalid endpoint "${clean}". Must NOT include base URL — only "/documents", "/customers", etc.`,
		);
	}

	return clean.startsWith('/') ? clean : `/${clean}`;
}

/**
 * Wraps an unknown thrown value into an n8n node error.
 *
 * Errors that already are NodeApiError / NodeOperationError are passed through untouched, so
 * the HTTP context requestCore attached to them is not lost to double wrapping.
 */
export function toNodeError(this: EasybillThis, error: unknown): Error {
	if (error instanceof NodeApiError || error instanceof NodeOperationError) {
		return error;
	}

	return new NodeApiError(this.getNode(), error as JsonObject);
}

/**
 * Resolves which credential the user configured.
 *
 * Returns the credential *name* (for httpRequestWithAuthentication, which injects the auth
 * headers from the credential's `authenticate` block) plus the base URL, which only lives on
 * the credential itself. Probing by getCredentials works uniformly across all the execution
 * contexts in EasybillThis, unlike reading the node's `authentication` parameter.
 */
async function resolveCredentials(this: EasybillThis): Promise<{
	credentialName: string;
	creds: IDataObject;
}> {
	try {
		const creds = await this.getCredentials('easybillApiBearerApi');
		return { credentialName: 'easybillApiBearerApi', creds };
	} catch (error) {
		this.logger.debug('Easybill: no Bearer credential, trying Basic Auth', { error });
	}

	try {
		const creds = await this.getCredentials('easybillApiBasicApi');
		return { credentialName: 'easybillApiBasicApi', creds };
	} catch (error) {
		this.logger.debug('Easybill: no Basic Auth credential either', { error });
	}

	throw new NodeOperationError(this.getNode(), 'No Easybill credentials found (Bearer or Basic Auth).');
}

/**
 * Core HTTP transport for Easybill
 */
async function requestCore(
	this: EasybillThis,
	{
		method,
		endpoint,
		qs,
		body,
		formData,
		binary = false,
		headers: userHeaders = {},
	}: {
		method: IHttpRequestOptions['method'];
		endpoint: string;
		qs?: IDataObject;
		body?: IDataObject;
		formData?: IDataObject;
		binary?: boolean;
		headers?: IDataObject;
	},
): Promise<any> {
	const { credentialName, creds } = await resolveCredentials.call(this);

	// ----------------------
	// BASE URL HANDLING
	// ----------------------
	let baseURL = String(creds.baseUrl || '').trim();
	if (!baseURL) {
		throw new NodeOperationError(this.getNode(), 'Base URL missing in Easybill credentials.');
	}

	baseURL = baseURL.replace(/\/+$/, ''); // no trailing slash
	const finalUrl = baseURL + normalizeEndpoint(endpoint);

	// ----------------------
	// DEFAULT HEADERS
	// ----------------------
	// Authorization is NOT set here — httpRequestWithAuthentication injects it from the
	// credential's `authenticate` block, which is the single source of truth for auth.
	const baseHeaders: IDataObject = {
		Accept: 'application/json',
		'X-Easybill-Escape': true,
	};

	// ----------------------
	// MERGE USER HEADERS
	// (user headers override defaults!)
	// ----------------------
	const mergedHeaders = {
		...baseHeaders,
		...userHeaders,
	};

	// ----------------------
	// OPTIONS OBJECT
	// ----------------------
	const options: IHttpRequestOptions = {
		method,
		url: finalUrl,
		headers: mergedHeaders,
	};

	if (qs) options.qs = qs;

	if (formData) {
		options.body = formData;
		// NOTE: multipart boundary wird vom httpRequest selbst gesetzt.
	}

	if (body && !formData) {
		options.body = body;
		options.headers!['Content-Type'] = 'application/json';
	}

	if (binary) {
		options.encoding = 'arraybuffer';
		options.json = false;
		options.returnFullResponse = true;
	}

	// ----------------------
	// EXECUTE REQUEST
	// ----------------------
	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialName, options);
	} catch (error: any) {
		// Debug only, and deliberately without headers or body: the Authorization header and the
		// request payload (customer PII) must never reach the execution log.
		this.logger.debug('Easybill request failed', {
			method,
			url: finalUrl,
			raw: error.response?.data ?? error.response?.body ?? error.message ?? String(error),
		});

		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: 'Easybill API request failed',
		});
	}
}

export function easybillApiRequest(
	this: EasybillThis,
	method: IHttpRequestOptions['method'],
	endpoint: string,
	params: {
		qs?: IDataObject;
		body?: IDataObject;
		formData?: IDataObject;
		binary?: boolean;
		headers?: IDataObject;
	} = {},
): Promise<any> {
	return requestCore.call(this, {
		method,
		endpoint,
		qs: params.qs,
		body: params.body,
		formData: params.formData,
		binary: params.binary,
		headers: params.headers,
	});
}

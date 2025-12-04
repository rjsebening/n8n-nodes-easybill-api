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

import { Buffer } from 'buffer';

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
 * Resolves which credential type the user selected
 */
async function resolveCredentials(this: EasybillThis): Promise<{
	type: 'bearer' | 'basic';
	creds: IDataObject;
}> {
	try {
		const creds = await this.getCredentials('easybillApiBearerApi');
		return { type: 'bearer', creds };
	} catch {}

	try {
		const creds = await this.getCredentials('easybillApiBasicApi');
		return { type: 'basic', creds };
	} catch {}

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
	const { type, creds } = await resolveCredentials.call(this);

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
	const baseHeaders: IDataObject = {
		Accept: 'application/json',
		'X-Easybill-Escape': true,
	};

	// ----------------------
	// AUTH HEADERS
	// ----------------------
	if (type === 'bearer') {
		baseHeaders.Authorization = `Bearer ${creds.authToken || creds.apiKey}`;
	}

	if (type === 'basic') {
		const token = Buffer.from(`${creds.email}:${creds.apiKey}`).toString('base64');
		baseHeaders.Authorization = `Basic ${token}`;
	}

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
		const httpRequest = (this as any).helpers.httpRequest;
		return await httpRequest.call(this, options);

	} catch (error: any) {

		// ----------------------
		// DEBUG LOGGING
		// ----------------------
		this.logger.error('--- EASYBILL DEBUG ERROR ---');
		this.logger.error('URL: ' + finalUrl);
		this.logger.error('METHOD: ' + method);
		this.logger.error('REQUEST HEADERS: ' + JSON.stringify(mergedHeaders));
		this.logger.error('REQUEST BODY: ' + JSON.stringify(body || {}));
		this.logger.error('REQUEST QS: ' + JSON.stringify(qs || {}));

		const raw =
			error.response?.data ??
			error.response?.body ??
			error.message ??
			error;

		this.logger.error('RAW ERROR: ' + JSON.stringify(raw));
		this.logger.error('--------------------------------');

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

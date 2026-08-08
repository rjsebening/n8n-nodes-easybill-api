import {
	IExecuteFunctions,
	INodeExecutionData,
	IDataObject,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

type QueryParameterEntry = {
	name?: string;
	value?: unknown;
};

type QueryParameterCollection = IDataObject & {
	parameter?: QueryParameterEntry[];
};

function isQueryValue(value: unknown): value is IDataObject[keyof IDataObject] {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		Array.isArray(value) ||
		(typeof value === 'object' && value !== null)
	);
}

export async function custom(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const method = this.getNodeParameter('method', index) as IHttpRequestMethods;
	const url = this.getNodeParameter('url', index) as string;
	const queryParameters = this.getNodeParameter('queryParameters', index, {}) as QueryParameterCollection;

	let qs: IDataObject | undefined;
	const entries = queryParameters.parameter;
	if (Array.isArray(entries)) {
		qs = {};
		for (const entry of entries) {
			if (entry?.name && isQueryValue(entry.value)) {
				qs[entry.name] = entry.value;
			}
		}
		if (Object.keys(qs).length === 0) qs = undefined;
	}

	// Only the write methods carry a body — a GET must not send one.
	let body: IDataObject | undefined;
	if (['POST', 'PUT', 'PATCH'].includes(method)) {
		const rawBody = this.getNodeParameter('rawBody', index, '{}') as string;

		let parsed: unknown;
		try {
			parsed = JSON.parse(rawBody);
		} catch (err) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in Raw Body: ${(err as Error).message}`,
				{ itemIndex: index },
			);
		}

		if (parsed && typeof parsed === 'object') {
			body = parsed as IDataObject;
		} else {
			throw new NodeOperationError(this.getNode(), 'Request body must be a JSON object', {
				itemIndex: index,
			});
		}
	}

	const response = await easybillApiRequest.call(this, method, url, { qs, body });

	return this.helpers.returnJsonArray([response]);
}

import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function custom(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const url = this.getNodeParameter('url', index) as string;

	// Cast to IHttpRequestMethods (fixes TypeScript error)
	const method = this.getNodeParameter('method', index) as IHttpRequestMethods;

	const rawBody = this.getNodeParameter('rawBody', index) as string;
	let body: any = {};

	if (rawBody) {
		try {
			body = JSON.parse(rawBody);
		} catch (err) {
			throw new Error(`Invalid JSON in Raw Body: ${(err as Error).message}`);
		}
	}

	const response = await easybillApiRequest.call(this, method, url, { body });

	return this.helpers.returnJsonArray([response]);
}

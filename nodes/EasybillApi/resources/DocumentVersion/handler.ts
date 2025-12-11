import { IExecuteFunctions, INodeExecutionData, IHttpRequestOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const documentId = this.getNodeParameter('documentId', index) as number;
	const versionId = this.getNodeParameter('versionId', index) as number;

	const responseData = await easybillApiRequest.call(this, 'GET', `/documents/${documentId}/versions/${versionId}`);

	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const documentId = this.getNodeParameter('documentId', index) as number;
	const limit = this.getNodeParameter('limit', index) as number;

	const qs = { limit };

	const responseData = await easybillApiRequest.call(this, 'GET', `/documents/${documentId}/versions`, { qs });

	return this.helpers.returnJsonArray(responseData.items);
}

export async function downloadItem(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const documentId = this.getNodeParameter('documentId', index) as number;
	const versionId = this.getNodeParameter('versionId', index) as number;
	const versionItemId = this.getNodeParameter('versionItemId', index) as number;

	const credentials = await this.getCredentials('easybillApi');

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `https://api.easybill.de/rest/v1/documents/${documentId}/versions/${versionId}/items/${versionItemId}/download`,
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
		},
		returnFullResponse: true,
		encoding: 'arraybuffer', // n8n binary mode
		json: false,
	};

	const response = await this.helpers.httpRequest(options);

	// @ts-ignore - Buffer exists globally in Node.js even if TS doesn't know it
	const fileBuffer = Buffer.from(response.body as ArrayBuffer);

	const binaryData = await this.helpers.prepareBinaryData(
		fileBuffer,
		`version_item_${versionItemId}.bin`,
		response.headers?.['content-type'] ?? 'application/octet-stream',
	);

	return [
		{
			json: { success: true, documentId, versionId, versionItemId },
			binary: { data: binaryData },
		},
	];
}

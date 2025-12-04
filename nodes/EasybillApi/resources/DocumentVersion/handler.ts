import { Buffer } from 'buffer';
import { IExecuteFunctions, INodeExecutionData, IRequestOptions } from 'n8n-workflow';
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
	const options: IRequestOptions = {
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
		},
		method: 'GET',
		uri: `https://api.easybill.de/rest/v1/documents/${documentId}/versions/${versionId}/items/${versionItemId}/download`,
		encoding: 'binary',
		json: false,
		resolveWithFullResponse: true,
	};

	const response = (await this.helpers.request(options)) as { headers: any; body: Buffer };
	const binaryData = await this.helpers.prepareBinaryData(
		response.body,
		`version_item_${versionItemId}.bin`,
		response.headers['content-type'],
	);

	return [
		{
			json: { success: true, documentId, versionId, versionItemId },
			binary: { data: binaryData },
		},
	];
}

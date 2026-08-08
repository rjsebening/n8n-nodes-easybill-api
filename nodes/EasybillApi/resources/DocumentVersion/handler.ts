import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
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

	const response = await easybillApiRequest.call(
		this,
		'GET',
		`/documents/${documentId}/versions/${versionId}/items/${versionItemId}/download`,
		{ binary: true },
	);

	const { body, headers } = response;

	const mimeType = headers['content-type'] || 'application/octet-stream';

	let fileName = `version_item_${versionItemId}`;
	const disposition = headers['content-disposition'];
	if (disposition) {
		const match = disposition.match(/filename="(.+?)"/);
		if (match) fileName = match[1];
	}

	const binaryData = await this.helpers.prepareBinaryData(body, fileName, mimeType);

	return [
		{
			json: { success: true, documentId, versionId, versionItemId },
			binary: { data: binaryData },
			pairedItem: { item: index },
		},
	];
}

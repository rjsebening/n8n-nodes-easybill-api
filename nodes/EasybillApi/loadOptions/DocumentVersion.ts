import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadDocumentVersionOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const documentId = this.getCurrentNodeParameter('documentId') as number;
	if (!documentId) return [];

	const responseData = await easybillApiRequest.call(this, 'GET', `/documents/${documentId}/versions`, {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: `Version ${item.id} (${item.created_at})`,
		value: item.id,
	}));
}

import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadDocumentOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/documents', {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: item.type ? `${item.id} - ${item.type}` : String(item.id),
		value: item.id,
	}));
}

import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadAttachmentOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await easybillApiRequest.call(this, 'GET', '/attachments', {
		qs: { limit: 100 },
	});

	if (!response.items) return [];

	return response.items.map((item: any) => ({
		name: item.file_name || String(item.id),
		value: item.id,
	}));
}

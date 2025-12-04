import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadPostBoxOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/post-boxes', {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: `Post Box ${item.id} to ${item.to}`,
		value: item.id,
	}));
}

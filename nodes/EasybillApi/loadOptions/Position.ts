import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadPositionOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/positions', {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];

	return responseData.items.map((item: any) => ({
		name: item.number,
		value: item.id,
		description: item.note || '',
	}));
}

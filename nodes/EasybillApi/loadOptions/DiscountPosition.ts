import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadDiscountPositionOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await easybillApiRequest.call(this, 'GET', '/discounts/position', {
		qs: { limit: 100 },
	});

	if (!response.items) return [];

	return response.items.map((item: any) => ({
		name: `Discount ID: ${item.id}`,
		value: item.id,
	}));
}

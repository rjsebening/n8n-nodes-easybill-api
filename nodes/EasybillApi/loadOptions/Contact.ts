import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadContactOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const customerId = this.getCurrentNodeParameter('customerId') as number;

	if (!customerId) return [];

	const response = await easybillApiRequest.call(this, 'GET', `/customers/${customerId}/contacts`, {
		qs: { limit: 100 },
	});

	if (!response.items) return [];

	return response.items.map((item: any) => ({
		name: `${item.first_name || ''} ${item.last_name || ''} (${item.id})`.trim(),
		value: item.id,
	}));
}

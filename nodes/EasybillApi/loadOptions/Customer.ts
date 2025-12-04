import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadCustomerOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await easybillApiRequest.call(this, 'GET', '/customers', {
		qs: { limit: 100 },
	});

	if (!response.items) return [];

	return response.items.map((item: any) => ({
		name: item.display_name || `${item.company_name} (${item.id})`,
		value: item.id,
	}));
}

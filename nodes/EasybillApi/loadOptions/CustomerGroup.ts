import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadCustomerGroupOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await easybillApiRequest.call(this, 'GET', '/customer-groups', {
		qs: { limit: 100 },
	});

	if (!response.items) return [];

	return response.items.map((item: any) => ({
		name: item.display_name || `${item.name} (${item.id})`,
		value: item.id,
	}));
}

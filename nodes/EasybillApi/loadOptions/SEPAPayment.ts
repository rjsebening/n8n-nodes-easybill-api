import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadSepaPaymentOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/sepa-payments', {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: `SEPA Payment ${item.id}`,
		value: item.id,
	}));
}

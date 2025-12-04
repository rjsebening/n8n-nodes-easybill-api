import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadTextTemplateOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/text-templates', {
		qs: { limit: 100 },
	});
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: item.title,
		value: item.id,
	}));
}

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const type = this.getNodeParameter('type', index) as string;

	const qs: any = {};
	if (type) qs.type = type;

	const response = await easybillApiRequest.call(this, 'GET', '/pdf-templates', { qs });

	// return items array
	return this.helpers.returnJsonArray(response.items ?? []);
}

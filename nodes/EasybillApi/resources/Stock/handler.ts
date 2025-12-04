import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const positionId = this.getNodeParameter('positionId', index) as number;
	const stockCount = this.getNodeParameter('stockCount', index) as number;
	const note = this.getNodeParameter('note', index) as string;

	const body = {
		position_id: positionId,
		stock_count: stockCount,
		note,
	};

	const responseData = await easybillApiRequest.call(this, 'POST', '/stocks', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/stocks/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = this.getNodeParameter('filters', index) as any;
	const qs = { limit, ...filters };
	const responseData = await easybillApiRequest.call(this, 'GET', '/stocks', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const serialNumber = this.getNodeParameter('serialNumber', index) as string;
	const positionId = this.getNodeParameter('positionId', index) as number;
	const body = { serial_number: serialNumber, position_id: positionId };
	const responseData = await easybillApiRequest.call(this, 'POST', '/serial-numbers', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/serial-numbers/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = this.getNodeParameter('filters', index) as any;
	const qs = { limit, ...filters };
	const responseData = await easybillApiRequest.call(this, 'GET', '/serial-numbers', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/serial-numbers/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

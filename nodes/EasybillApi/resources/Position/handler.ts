import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const number = this.getNodeParameter('number', index) as string;
	const description = this.getNodeParameter('description', index) as string;
	const salePrice = this.getNodeParameter('salePrice', index) as number;
	const additional = this.getNodeParameter('additionalFields', index) as any;

	const body = { number, description, sale_price: salePrice, ...additional };
	const responseData = await easybillApiRequest.call(this, 'POST', '/positions', body);
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const number = this.getNodeParameter('number', index) as string;
	const description = this.getNodeParameter('description', index) as string;
	const salePrice = this.getNodeParameter('salePrice', index) as number;
	const additional = this.getNodeParameter('additionalFields', index) as any;

	const body = { number, description, sale_price: salePrice, ...additional };
	const responseData = await easybillApiRequest.call(this, 'PUT', `/positions/${id}`, body);
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/positions/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const qs = { limit };
	const responseData = await easybillApiRequest.call(this, 'GET', '/positions', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/positions/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

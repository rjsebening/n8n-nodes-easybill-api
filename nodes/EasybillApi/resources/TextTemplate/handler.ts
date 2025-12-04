import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const title = this.getNodeParameter('title', index) as string;
	const text = this.getNodeParameter('text', index) as string;
	const body = { title, text };
	const responseData = await easybillApiRequest.call(this, 'POST', '/text-templates', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const title = this.getNodeParameter('title', index) as string;
	const text = this.getNodeParameter('text', index) as string;
	const body = { title, text };
	const responseData = await easybillApiRequest.call(this, 'PUT', `/text-templates/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/text-templates/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const qs = { limit };
	const responseData = await easybillApiRequest.call(this, 'GET', '/text-templates', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/text-templates/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

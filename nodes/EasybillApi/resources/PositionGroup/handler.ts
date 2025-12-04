import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const number = this.getNodeParameter('number', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const description = this.getNodeParameter('description', index) as string;

	const body = {
		number,
		name,
		description,
	};

	const responseData = await easybillApiRequest.call(this, 'POST', '/position-groups', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const number = this.getNodeParameter('number', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const description = this.getNodeParameter('description', index) as string;

	const body = {
		number,
		name,
		description,
	};

	const responseData = await easybillApiRequest.call(this, 'PUT', `/position-groups/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/position-groups/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const qs = { limit };
	const responseData = await easybillApiRequest.call(this, 'GET', '/position-groups', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/position-groups/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

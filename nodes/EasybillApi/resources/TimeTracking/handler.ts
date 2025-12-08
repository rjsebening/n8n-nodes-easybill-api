import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const description = this.getNodeParameter('description', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		description,
		...additionalFields,
	};

	const responseData = await easybillApiRequest.call(this, 'POST', '/time-trackings', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const description = this.getNodeParameter('description', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		description,
		...additionalFields,
	};

	const responseData = await easybillApiRequest.call(this, 'PUT', `/time-trackings/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/time-trackings/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = this.getNodeParameter('filters', index) as any;
	const qs = { limit, ...filters };
	const responseData = await easybillApiRequest.call(this, 'GET', '/time-trackings', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/time-trackings/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

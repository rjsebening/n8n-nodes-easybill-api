import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const url = this.getNodeParameter('url', index) as string;
	const contentType = this.getNodeParameter('contentType', index) as string;
	const events = this.getNodeParameter('events', index) as string[];
	const description = this.getNodeParameter('description', index) as string;
	const secret = this.getNodeParameter('secret', index) as string;
	const isActive = this.getNodeParameter('isActive', index) as boolean;

	const body = { url, content_type: contentType, events, description, secret, is_active: isActive };
	const responseData = await easybillApiRequest.call(this, 'POST', '/webhooks', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const url = this.getNodeParameter('url', index) as string;
	const contentType = this.getNodeParameter('contentType', index) as string;
	const events = this.getNodeParameter('events', index) as string[];
	const description = this.getNodeParameter('description', index) as string;
	const secret = this.getNodeParameter('secret', index) as string;
	const isActive = this.getNodeParameter('isActive', index) as boolean;

	const body = { url, content_type: contentType, events, description, secret, is_active: isActive };
	const responseData = await easybillApiRequest.call(this, 'PUT', `/webhooks/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/webhooks/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const qs = { limit };
	const responseData = await easybillApiRequest.call(this, 'GET', '/webhooks', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/webhooks/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

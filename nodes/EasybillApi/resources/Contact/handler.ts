import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const city = this.getNodeParameter('city', index) as string;
	const street = this.getNodeParameter('street', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		city,
		street,
		...additionalFields,
	};

	if (body.emails && typeof body.emails === 'string') {
		body.emails = body.emails.split(',').map((e: string) => e.trim());
	}

	const responseData = await easybillApiRequest.call(this, 'POST', `/customers/${customerId}/contacts`, body);
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const id = this.getNodeParameter('id', index) as number;
	const city = this.getNodeParameter('city', index) as string;
	const street = this.getNodeParameter('street', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		city,
		street,
		...additionalFields,
	};

	if (body.emails && typeof body.emails === 'string') {
		body.emails = body.emails.split(',').map((e: string) => e.trim());
	}

	const responseData = await easybillApiRequest.call(this, 'PUT', `/customers/${customerId}/contacts/${id}`, body);
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/customers/${customerId}/contacts/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const limit = this.getNodeParameter('limit', index) as number;
	const qs = { limit };
	const responseData = await easybillApiRequest.call(this, 'GET', `/customers/${customerId}/contacts`, { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/customers/${customerId}/contacts/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

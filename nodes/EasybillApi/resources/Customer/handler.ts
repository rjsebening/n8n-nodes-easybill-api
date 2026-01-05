import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

function cleanObject(obj: Record<string, any>) {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === ''),
		),
	);
}

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const lastName = this.getNodeParameter('lastName', index) as string;
	const companyName = this.getNodeParameter('companyName', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	let body: Record<string, any> = {
		last_name: lastName,
		company_name: companyName,
		...additionalFields,
	};

	if (typeof body.emails === 'string') {
		body.emails = body.emails
			.split(',')
			.map((e: string) => e.trim())
			.filter(Boolean);
	}

	if (typeof body.additional_groups_ids === 'string') {
		body.additional_groups_ids = body.additional_groups_ids
			.split(',')
			.map((id: string) => Number(id.trim()))
			.filter((id: number) => !isNaN(id));
	}

	body = cleanObject(body);

	const responseData = await easybillApiRequest.call(this, 'POST', '/customers', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const lastName = this.getNodeParameter('lastName', index) as string;
	const companyName = this.getNodeParameter('companyName', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;

	let body: Record<string, any> = {
		last_name: lastName,
		company_name: companyName,
		...additionalFields,
	};

	if (typeof body.emails === 'string') {
		body.emails = body.emails
			.split(',')
			.map((e: string) => e.trim())
			.filter(Boolean);
	}

	if (typeof body.additional_groups_ids === 'string') {
		body.additional_groups_ids = body.additional_groups_ids
			.split(',')
			.map((id: string) => Number(id.trim()))
			.filter((id: number) => !isNaN(id));
	}

	body = cleanObject(body);

	const responseData = await easybillApiRequest.call(this, 'PUT', `/customers/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/customers/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = this.getNodeParameter('filters', index) as any;
	const qs = {
		limit,
		...filters,
	};
	const responseData = await easybillApiRequest.call(this, 'GET', '/customers', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/customers/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

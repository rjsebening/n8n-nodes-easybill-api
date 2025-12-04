import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const documentId = this.getNodeParameter('documentId', index) as number;
	const amount = this.getNodeParameter('amount', index) as number;
	const paid = this.getNodeParameter('paid', index) as boolean;

	const paymentAt = this.getNodeParameter('paymentAt', index) as string;
	const type = this.getNodeParameter('type', index) as string;
	const provider = this.getNodeParameter('provider', index) as string;
	const reference = this.getNodeParameter('reference', index) as string;
	const notice = this.getNodeParameter('notice', index) as string;

	const body: any = {
		document_id: documentId,
		amount,
	};

	if (paymentAt) body.payment_at = paymentAt;
	if (type) body.type = type;
	if (provider) body.provider = provider;
	if (reference) body.reference = reference;
	if (notice) body.notice = notice;

	const qs: any = {};
	if (paid !== undefined) qs.paid = paid;

	const response = await easybillApiRequest.call(this, 'POST', '/document-payments', { body, qs });

	return this.helpers.returnJsonArray([response]);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/document-payments/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = this.getNodeParameter('filters', index) as any;
	const qs = { limit, ...filters };
	const responseData = await easybillApiRequest.call(this, 'GET', '/document-payments', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/document-payments/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

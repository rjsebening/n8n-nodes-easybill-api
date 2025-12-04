import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as number;
	const positionGroupId = this.getNodeParameter('positionGroupId', index) as number;
	const discount = this.getNodeParameter('discount', index) as number;
	const discountType = this.getNodeParameter('discountType', index) as string;

	const body = {
		customer_id: customerId,
		position_group_id: positionGroupId,
		discount,
		discount_type: discountType,
	};

	const responseData = await easybillApiRequest.call(this, 'POST', '/discounts/position-group', { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const customerId = this.getNodeParameter('customerId', index) as number;
	const positionGroupId = this.getNodeParameter('positionGroupId', index) as number;
	const discount = this.getNodeParameter('discount', index) as number;
	const discountType = this.getNodeParameter('discountType', index) as string;

	const body = {
		customer_id: customerId,
		position_group_id: positionGroupId,
		discount,
		discount_type: discountType,
	};

	const responseData = await easybillApiRequest.call(this, 'PUT', `/discounts/position-group/${id}`, { body });
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/discounts/position-group/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const customerIdFilter = this.getNodeParameter('customerIdFilter', index) as string;
	const qs: any = { limit };

	if (customerIdFilter) {
		qs.customer_id = customerIdFilter;
	}

	const responseData = await easybillApiRequest.call(this, 'GET', '/discounts/position-group', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/discounts/position-group/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

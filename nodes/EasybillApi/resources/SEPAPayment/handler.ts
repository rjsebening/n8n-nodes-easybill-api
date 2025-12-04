import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const documentId = this.getNodeParameter('documentId', index) as number;
	const debitorName = this.getNodeParameter('debitorName', index) as string;
	const debitorIban = this.getNodeParameter('debitorIban', index) as string;
	const mandateId = this.getNodeParameter('mandateId', index) as string;
	const mandateDate = this.getNodeParameter('mandateDateOfSignature', index) as string;
	const instrument = this.getNodeParameter('localInstrument', index) as string;
	const sequence = this.getNodeParameter('sequenceType', index) as string;
	const amount = this.getNodeParameter('amount', index) as number;
	const reference = this.getNodeParameter('reference', index) as string;
	const additional = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		document_id: documentId,
		debitor_name: debitorName,
		debitor_iban: debitorIban,
		mandate_id: mandateId,
		mandate_date_of_signature: mandateDate,
		local_instrument: instrument,
		sequence_type: sequence,
		amount,
		reference,
		...additional,
	};

	const responseData = await easybillApiRequest.call(this, 'POST', '/sepa-payments', body);
	return this.helpers.returnJsonArray(responseData);
}

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const documentId = this.getNodeParameter('documentId', index) as number;
	const debitorName = this.getNodeParameter('debitorName', index) as string;
	const debitorIban = this.getNodeParameter('debitorIban', index) as string;
	const mandateId = this.getNodeParameter('mandateId', index) as string;
	const mandateDate = this.getNodeParameter('mandateDateOfSignature', index) as string;
	const instrument = this.getNodeParameter('localInstrument', index) as string;
	const sequence = this.getNodeParameter('sequenceType', index) as string;
	const amount = this.getNodeParameter('amount', index) as number;
	const reference = this.getNodeParameter('reference', index) as string;
	const additional = this.getNodeParameter('additionalFields', index) as any;

	const body = {
		document_id: documentId,
		debitor_name: debitorName,
		debitor_iban: debitorIban,
		mandate_id: mandateId,
		mandate_date_of_signature: mandateDate,
		local_instrument: instrument,
		sequence_type: sequence,
		amount,
		reference,
		...additional,
	};

	const responseData = await easybillApiRequest.call(this, 'PUT', `/sepa-payments/${id}`, body);
	return this.helpers.returnJsonArray(responseData);
}

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/sepa-payments/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const docId = this.getNodeParameter('documentIdFilter', index) as string;
	const qs: any = { limit };
	if (docId) qs.document_id = docId;
	const responseData = await easybillApiRequest.call(this, 'GET', '/sepa-payments', { qs });
	return this.helpers.returnJsonArray(responseData.items);
}

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	await easybillApiRequest.call(this, 'DELETE', `/sepa-payments/${id}`);
	return this.helpers.returnJsonArray({ success: true });
}

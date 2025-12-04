import { IExecuteFunctions, INodeExecutionData, NodeApiError } from 'n8n-workflow';

import { easybillApiRequest } from '../../transport/request';

// -----------------------------------------------------------
// Helper: ensures JSON-safe cloning (removes circular structures)
// -----------------------------------------------------------
function safeClone<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

// -----------------------------------------------------------
// Helper: validate and normalize Items JSON
// -----------------------------------------------------------
function getItemsJson(param: any): any[] | null {
	if (!param) return null;

	let items = param;

	// If user provides raw string
	if (typeof items === 'string') {
		try {
			items = JSON.parse(items);
		} catch {
			throw new Error('Items JSON must be valid JSON.');
		}
	}

	// Must be array
	if (!Array.isArray(items)) {
		throw new Error('Items JSON must be an array.');
	}

	// All entries must be objects with at least position_id
	for (const item of items) {
		if (typeof item !== 'object' || Array.isArray(item)) {
			throw new Error('Each item must be an object.');
		}
		if (!item.position_id) {
			throw new Error('Each item must contain position_id.');
		}
	}

	return items;
}

// -----------------------------------------------------------
// CREATE DOCUMENT
// -----------------------------------------------------------
export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as string;
	const type = this.getNodeParameter('type', index) as string;

	// Items JSON (primary input)
	const itemsParam = this.getNodeParameter('itemsJson', index, null);
	const itemsJson = getItemsJson(itemsParam);

	// Clean additional fields
	const additionalFieldsRaw = this.getNodeParameter('additionalFields', index, {}) as any;

	const additionalFields = safeClone(additionalFieldsRaw);

	// Build request body
	const body: any = {
		customer_id: customerId,
		type,
		...additionalFields,
	};

	if (itemsJson) {
		body.items = itemsJson;
	}

	const responseData = await easybillApiRequest.call(this, 'POST', '/documents', body);

	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// UPDATE DOCUMENT
// -----------------------------------------------------------
export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const itemsParam = this.getNodeParameter('itemsJson', index, null);
	const itemsJson = getItemsJson(itemsParam);

	const additionalFieldsRaw = this.getNodeParameter('additionalFields', index, {}) as any;

	const additionalFields = safeClone(additionalFieldsRaw);

	const body: any = {
		...additionalFields,
	};

	// Important: update REPLACES all items in Easybill
	if (itemsJson) {
		body.items = itemsJson;
	}

	const responseData = await easybillApiRequest.call(this, 'PUT', `/documents/${id}`, body);

	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// GET DOCUMENT
// -----------------------------------------------------------
export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const responseData = await easybillApiRequest.call(this, 'GET', `/documents/${id}`);
	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// GET ALL DOCUMENTS
// -----------------------------------------------------------
export async function getAll(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const filters = safeClone(this.getNodeParameter('filters', index, {}) as any);

	if (filters.is_draft !== undefined) {
		filters.is_draft = filters.is_draft ? '1' : '0';
	}

	const qs = { limit, ...filters };

	const responseData = await easybillApiRequest.call(this, 'GET', '/documents', { qs });

	return this.helpers.returnJsonArray(responseData.items);
}

// -----------------------------------------------------------
// DELETE DOCUMENT
// -----------------------------------------------------------
export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	await easybillApiRequest.call(this, 'DELETE', `/documents/${id}`);

	return this.helpers.returnJsonArray({ success: true });
}

// -----------------------------------------------------------
// SEND DOCUMENT
// -----------------------------------------------------------
export async function send(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const sendType = this.getNodeParameter('sendType', index) as string;
	const sendOptions = safeClone(this.getNodeParameter('sendOptions', index, {}) as any);

	await easybillApiRequest.call(this, 'POST', `/documents/${id}/send/${sendType}`, sendOptions);

	return this.helpers.returnJsonArray({ success: true });
}

// -----------------------------------------------------------
// MARK AS DONE
// -----------------------------------------------------------
export async function done(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const responseData = await easybillApiRequest.call(this, 'PUT', `/documents/${id}/done`);

	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// CANCEL DOCUMENT
// -----------------------------------------------------------
export async function cancel(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const responseData = await easybillApiRequest.call(this, 'POST', `/documents/${id}/cancel`);

	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// CONVERT DOCUMENT TYPE
// -----------------------------------------------------------
export async function convert(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const targetType = this.getNodeParameter('targetType', index) as string;

	const responseData = await easybillApiRequest.call(this, 'POST', `/documents/${id}/${targetType}`);

	return this.helpers.returnJsonArray(responseData);
}

// -----------------------------------------------------------
// GET PDF
// -----------------------------------------------------------
export async function getPdf(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const response = await easybillApiRequest.call(this, 'GET', `/documents/${id}/pdf`, {
		binary: true,
	});

	const fileName = response.headers?.['content-disposition']?.match(/filename="(.+?)"/)?.[1] || `document_${id}.pdf`;

	const mime = response.headers?.['content-type'] || 'application/pdf';

	const binary = await this.helpers.prepareBinaryData(response.body, fileName, mime);

	return [
		{
			json: { success: true, id },
			binary: { data: binary },
		},
	];
}

// -----------------------------------------------------------
// GET JPG
// -----------------------------------------------------------
export async function getJpg(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const response = await easybillApiRequest.call(this, 'GET', `/documents/${id}/jpg`, {
		binary: true,
	});

	const fileName = response.headers?.['content-disposition']?.match(/filename="(.+?)"/)?.[1] || `document_${id}.jpg`;

	const mime = response.headers?.['content-type'] || 'image/jpeg';

	const binary = await this.helpers.prepareBinaryData(response.body, fileName, mime);

	return [
		{
			json: { success: true, id },
			binary: { data: binary },
		},
	];
}

// -----------------------------------------------------------
// DOWNLOAD (custom format)
// -----------------------------------------------------------
export async function download(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const acceptHeader = this.getNodeParameter('acceptHeader', index) as string;

	let response;
	try {
		response = await easybillApiRequest.call(this, 'GET', `/documents/${id}/download`, {
			binary: true,
			qs: {},
			body: {},
			formData: {},
			// accept header wird vom transporter gesetzt
			// wir müssen es nur an params übergeben:
			// params.headers überschreibt im transporter
			headers: {
				Accept: acceptHeader,
			},
		});
	} catch (error: any) {
		if (error?.httpCode === '406') {
			throw new NodeApiError(this.getNode(), error, {
				message: `Easybill: Format "${acceptHeader}" wird für Dokument ${id} nicht unterstützt.`,
			});
		}
		throw error;
	}

	const { body, headers } = response;

	// MIME type ermitteln
	const mimeType = headers['content-type'] || acceptHeader || 'application/octet-stream';

	// Filename extrahieren
	let fileName = `document_${id}`;
	const disposition = headers['content-disposition'];
	if (disposition) {
		const match = disposition.match(/filename="(.+?)"/);
		if (match) fileName = match[1];
	}

	// Binary bauen
	const binary = await this.helpers.prepareBinaryData(body, fileName, mimeType);

	return [
		{
			json: { success: true, id, mimeType },
			binary: { data: binary },
		},
	];
}



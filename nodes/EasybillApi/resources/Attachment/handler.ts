import { IExecuteFunctions } from 'n8n-workflow';
import { easybillApiRequest } from '../../transport/request';

/* --------------------------------------------------------
 * CREATE (multipart/form-data)
 * ------------------------------------------------------ */
export async function create(this: IExecuteFunctions, index: number) {
	const binaryProperty = this.getNodeParameter('binaryProperty', index) as string;
	const items = this.getInputData();
	const item = items[index];

	if (!item.binary || !item.binary[binaryProperty]) {
		throw new Error(`Binary property '${binaryProperty}' not found.`);
	}

	// Correct signature for YOUR n8n version:
	const buffer = await this.helpers.getBinaryDataBuffer(index, binaryProperty);

	const binaryData = item.binary[binaryProperty];
	const fileName = binaryData.fileName || 'file.bin';

	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

	const formData = {
		...additionalFields,
		file: {
			value: buffer,
			options: {
				filename: fileName,
				contentType: binaryData.mimeType,
			},
		},
	};

	const response = await easybillApiRequest.call(this, 'POST', '/attachments', { formData });

	return this.helpers.returnJsonArray(response);
}

/* --------------------------------------------------------
 * UPDATE
 * ------------------------------------------------------ */
export async function update(this: IExecuteFunctions, index: number) {
	const id = this.getNodeParameter('id', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

	const response = await easybillApiRequest.call(this, 'PUT', `/attachments/${id}`, { body: additionalFields });

	return this.helpers.returnJsonArray(response);
}

/* --------------------------------------------------------
 * GET
 * ------------------------------------------------------ */
export async function get(this: IExecuteFunctions, index: number) {
	const id = this.getNodeParameter('id', index) as number;

	const response = await easybillApiRequest.call(this, 'GET', `/attachments/${id}`, {});

	return this.helpers.returnJsonArray(response);
}

/* --------------------------------------------------------
 * GET ALL
 * ------------------------------------------------------ */
export async function getAll(this: IExecuteFunctions, index: number) {
	const limit = this.getNodeParameter('limit', index) as number;
	const page = this.getNodeParameter('page', index) as number;

	const qs = { limit, page };

	const response = await easybillApiRequest.call(this, 'GET', '/attachments', { qs });

	return this.helpers.returnJsonArray(response.items);
}

/* --------------------------------------------------------
 * DELETE
 * ------------------------------------------------------ */
export async function del(this: IExecuteFunctions, index: number) {
	const id = this.getNodeParameter('id', index) as number;

	await easybillApiRequest.call(this, 'DELETE', `/attachments/${id}`, {});

	return this.helpers.returnJsonArray({ success: true });
}

/* --------------------------------------------------------
 * GET CONTENT (binary download)
 * ------------------------------------------------------ */
export async function getContent(this: IExecuteFunctions, index: number) {
	const id = this.getNodeParameter('id', index) as number;

	const response = await easybillApiRequest.call(this, 'GET', `/attachments/${id}/content`, {
		binary: true,
	});

	// Extract filename from response.headers
	let fileName = `attachment_${id}`;
	const contentDisposition = response.headers?.['content-disposition'];

	if (contentDisposition) {
		const match = contentDisposition.match(/filename="(.+?)"/);
		if (match) fileName = match[1];
	}

	const binary = await this.helpers.prepareBinaryData(
		response.body,
		fileName,
		response.headers?.['content-type'] ?? 'application/octet-stream',
	);

	return [
		{
			json: { success: true, id },
			binary: { data: binary },
		},
	];
}

import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { easybillApiRequest } from '../transport/request';

export async function loadPDFTemplateOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await easybillApiRequest.call(this, 'GET', '/pdf-templates');
	if (!responseData.items) return [];
	return responseData.items.map((item: any) => ({
		name: item.id,
		value: item.pdf_template,
	}));
}

export async function loadPDFTemplateOptionsByType(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const docType = this.getCurrentNodeParameter('type') as string;

	const qs: Record<string, any> = {};

	if (docType) {
		qs.type = docType; // Easybill filter
	}

	const responseData = await easybillApiRequest.call(this, 'GET', '/pdf-templates', { qs });

	if (!responseData.items) return [];

	return responseData.items.map((item: any) => ({
		name: `${item.id} - ${item.name ?? 'No name'}`,
		value: item.pdf_template,
	}));
}

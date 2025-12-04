import { INodeProperties } from 'n8n-workflow';

export const pdfTemplateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pdfTemplate'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many PDF templates',
				description: 'Get a list of PDF templates',
			},
		],
		default: 'getAll',
	},
];

export const pdfTemplateFields: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Charge', value: 'CHARGE' },
			{ name: 'Charge Confirm', value: 'CHARGE_CONFIRM' },
			{ name: 'Credit', value: 'CREDIT' },
			{ name: 'Delivery', value: 'DELIVERY' },
			{ name: 'Dunning', value: 'DUNNING' },
			{ name: 'Invoice', value: 'INVOICE' },
			{ name: 'Letter', value: 'LETTER' },
			{ name: 'Offer', value: 'OFFER' },
			{ name: 'Order', value: 'ORDER' },
			{ name: 'Proforma Invoice', value: 'PROFORMA_INVOICE' },
			{ name: 'Reminder', value: 'REMINDER' },
			{ name: 'Storno', value: 'STORNO' },
			{ name: 'Storno Credit', value: 'STORNO_CREDIT' },
			{ name: 'Storno Proforma Invoice', value: 'STORNO_PROFORMA_INVOICE' },
		],
		default: 'INVOICE',
		displayOptions: { show: { resource: ['pdfTemplate'], operation: ['getAll'] } },
		description: 'Filters the templates by the specified type (comma-separated)',
	},
];

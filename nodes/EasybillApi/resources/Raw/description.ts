import { INodeProperties } from 'n8n-workflow';

export const rawOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['raw'],
			},
		},
		options: [
			{
				name: 'Custom Call',
				value: 'custom',
				action: 'Perform a custom API call',
				description: 'Perform a custom API call',
			},
		],
		default: 'custom',
	},
];

export const rawFields: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['raw'],
				operation: ['custom'],
			},
		},
		description: 'The endpoint URL (e.g. /customers)',
	},
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		default: 'GET',
		options: [
			{ name: 'DELETE', value: 'DELETE' },
			{ name: 'GET', value: 'GET' },
			{ name: 'POST', value: 'POST' },
			{ name: 'PUT', value: 'PUT' },
		],
		displayOptions: {
			show: {
				resource: ['raw'],
				operation: ['custom'],
			},
		},
		description: 'The HTTP method to use for the API request',
	},
	{
		displayName: 'Body JSON',
		name: 'rawBody',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['raw'],
				operation: ['custom'],
			},
		},
		description: 'Body parameters in JSON format',
	},
];

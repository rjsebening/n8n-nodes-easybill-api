import type { INodeProperties } from 'n8n-workflow';

export const rawProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'custom',
		displayOptions: { show: { resource: ['raw'] } },
		options: [
			{
				name: 'Custom Call',
				value: 'custom',
				description: 'Perform a custom API call',
				action: 'Perform a custom API call',
			},
		],
	},
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		displayOptions: { show: { resource: ['raw'], operation: ['custom'] } },
		options: [
			{ name: 'DELETE', value: 'DELETE' },
			{ name: 'GET', value: 'GET' },
			{ name: 'PATCH', value: 'PATCH' },
			{ name: 'POST', value: 'POST' },
			{ name: 'PUT', value: 'PUT' },
		],
		default: 'GET',
		required: true,
		description: 'HTTP method for the API call',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		displayOptions: { show: { resource: ['raw'], operation: ['custom'] } },
		default: '',
		required: true,
		placeholder: '/customers/123',
		description: 'API endpoint path (without base URL)',
	},
	{
		displayName: 'Body JSON',
		name: 'rawBody',
		type: 'json',
		displayOptions: {
			show: { resource: ['raw'], operation: ['custom'], method: ['POST', 'PUT', 'PATCH'] },
		},
		default: '{}',
		description: 'Request body as JSON',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: { show: { resource: ['raw'], operation: ['custom'] } },
		default: {},
		options: [
			{
				name: 'parameter',
				displayName: 'Parameter',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value of the query parameter',
					},
				],
			},
		],
	},
];

import { INodeProperties } from 'n8n-workflow';

export const loginOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['login'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get a login', description: 'Get a login by ID' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many logins', description: 'Get a list of logins' },
		],
		default: 'getAll',
	},
];

export const loginFields: INodeProperties[] = [
	{
		displayName: 'Login Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['login'],
				operation: ['get'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadLoginOptions',
		},
		description:
			'ID of the login. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['login'],
				operation: ['getAll'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

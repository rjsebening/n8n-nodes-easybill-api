import { INodeProperties } from 'n8n-workflow';

export const postBoxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['postBox'] } },
		options: [
			{ name: 'Delete', value: 'delete', action: 'Delete a post box', description: 'Delete a post box entry by ID' },
			{ name: 'Get', value: 'get', action: 'Get a post box', description: 'Get a post box entry by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many post boxes',
				description: 'Get a list of post box entries',
			},
		],
		default: 'getAll',
	},
];

export const postBoxFields: INodeProperties[] = [
	{
		displayName: 'Post Box Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['postBox'], operation: ['get', 'delete'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPostBoxOptions',
		},
		description:
			'ID of the post box entry. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['postBox'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['postBox'], operation: ['getAll'] } },
		description: 'Filter the results',
		options: [
			{ name: 'Fax', value: 'FAX' },
			{ name: 'Post', value: 'POST' },
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [{ name: 'Email', value: 'EMAIL' }],
				default: 'EMAIL',
				description: 'Filter by type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Error', value: 'ERROR' },
					{ name: 'Ok', value: 'OK' },
					{ name: 'Prepare', value: 'PREPARE' },
					{ name: 'Processing', value: 'PROCESSING' },
					{ name: 'Waiting', value: 'WAITING' },
				],
				default: 'WAITING',
				description: 'Filter by status',
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				description: 'Filter by document ID',
			},
		],
	},
];

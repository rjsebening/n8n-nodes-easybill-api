import { INodeProperties } from 'n8n-workflow';

export const stockOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stock'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a stock entry', description: 'Create a new stock entry' },
			{ name: 'Get', value: 'get', action: 'Get a stock entry', description: 'Get a stock entry by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many stock entries',
				description: 'Get a list of stock entries',
			},
		],
		default: 'getAll',
	},
];

export const stockFields: INodeProperties[] = [
	{
		displayName: 'Stock Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['stock'],
				operation: ['get'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadStockOptions',
		},
		description:
			'ID of the stock entry. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Position Name or ID',
		name: 'positionId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['stock'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPositionOptions',
		},
		description:
			'ID of the position. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Stock Count',
		name: 'stockCount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['stock'],
				operation: ['create'],
			},
		},
		default: 0,
		required: true,
		description: 'The number of items in stock',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['stock'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A note for the stock entry',
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
				resource: ['stock'],
				operation: ['getAll'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['stock'],
				operation: ['getAll'],
			},
		},
		description: 'Filter the results',
		options: [
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				description: 'Filter by document ID',
			},
			{
				displayName: 'Position ID',
				name: 'position_id',
				type: 'string',
				default: '',
				description: 'Filter by position ID',
			},
		],
	},
];

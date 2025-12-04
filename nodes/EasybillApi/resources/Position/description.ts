import { INodeProperties } from 'n8n-workflow';

export const positionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['position'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a position', description: 'Create a new position' },
			{ name: 'Delete', value: 'delete', action: 'Delete a position', description: 'Delete a position by ID' },
			{ name: 'Get', value: 'get', action: 'Get a position', description: 'Get a position by ID' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many positions', description: 'Get a list of positions' },
			{ name: 'Update', value: 'update', action: 'Update a position', description: 'Update a position by ID' },
		],
		default: 'getAll',
	},
];

export const positionFields: INodeProperties[] = [
	{
		displayName: 'Position Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['position'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPositionOptions',
		},
		description:
			'ID of the position. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		displayOptions: { show: { resource: ['position'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'The number of the position',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: { show: { resource: ['position'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'The description of the position',
	},
	{
		displayName: 'Sale Price (Cents)',
		name: 'salePrice',
		type: 'number',
		displayOptions: { show: { resource: ['position'], operation: ['create', 'update'] } },
		default: 0,
		required: true,
		description: 'The sale price in cents',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['position'], operation: ['create', 'update'] } },
		description: 'Additional fields for the position',
		options: [
			{
				displayName: 'Group Name or ID',
				name: 'group_id',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'loadPositionGroupOptions',
				},
				description:
					'ID of the position group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},

			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'A note for the position',
			},

			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [{ name: 'Product', value: 'PRODUCT' }],
				default: 'PRODUCT',
				description: 'The type of the position',
			},

			{
				displayName: 'Unit',
				name: 'unit',
				type: 'string',
				default: '',
				description: 'The unit of the position',
			},

			{
				displayName: 'VAT Percent',
				name: 'vat_percent',
				type: 'number',
				default: 19,
				description: 'The VAT percentage',
			},
		],
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['position'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

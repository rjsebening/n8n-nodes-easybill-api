import { INodeProperties } from 'n8n-workflow';

export const customerGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['customerGroup'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a customer group',
				description: 'Create a new customer group',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a customer group',
				description: 'Delete a customer group by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a customer group', description: 'Get a customer group by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many customer groups',
				description: 'Get a list of customer groups',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a customer group',
				description: 'Update a customer group by ID',
			},
		],
		default: 'getAll',
	},
];

export const customerGroupFields: INodeProperties[] = [
	{
		displayName: 'Group Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['customerGroup'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadCustomerGroupOptions',
		},
		description:
			'ID of the customer group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: { show: { resource: ['customerGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Name of the customer group',
	},
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		displayOptions: { show: { resource: ['customerGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Number of the customer group',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: { show: { resource: ['customerGroup'], operation: ['create', 'update'] } },
		default: '',
		description: 'Description of the customer group',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['customerGroup'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

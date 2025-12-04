import { INodeProperties } from 'n8n-workflow';

export const discountPositionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['discountPosition'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a position discount',
				description: 'Create a new position discount',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a position discount',
				description: 'Delete a position discount by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a position discount', description: 'Get a position discount by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many position discounts',
				description: 'Get a list of position discounts',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a position discount',
				description: 'Update a position discount by ID',
			},
		],
		default: 'getAll',
	},
];

export const discountPositionFields: INodeProperties[] = [
	{
		displayName: 'Discount Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['discountPosition'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDiscountPositionOptions',
		},
		description:
			'ID of the position discount. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Customer Name or ID',
		name: 'customerId',
		type: 'options',
		displayOptions: { show: { resource: ['discountPosition'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadCustomerOptions',
		},
		description:
			'ID of the customer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Position Name or ID',
		name: 'positionId',
		type: 'options',
		displayOptions: { show: { resource: ['discountPosition'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPositionOptions',
		},
		description:
			'ID of the position. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Discount Value',
		name: 'discount',
		type: 'number',
		displayOptions: { show: { resource: ['discountPosition'], operation: ['create', 'update'] } },
		default: 0,
		description: 'The value of the discount',
	},
	{
		displayName: 'Discount Type',
		name: 'discountType',
		type: 'options',
		options: [
			{ name: 'Amount', value: 'AMOUNT' },
			{ name: 'Fix', value: 'FIX' },
			{ name: 'Percent', value: 'PERCENT' },
			{ name: 'Quantity', value: 'QUANTITY' },
		],
		displayOptions: { show: { resource: ['discountPosition'], operation: ['create', 'update'] } },
		default: 'PERCENT',
		description: 'The type of the discount',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['discountPosition'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Customer ID Filter',
		name: 'customerIdFilter',
		type: 'string',
		displayOptions: { show: { resource: ['discountPosition'], operation: ['getAll'] } },
		default: '',
		description: 'Filter by customer_id (comma-separated)',
	},
];

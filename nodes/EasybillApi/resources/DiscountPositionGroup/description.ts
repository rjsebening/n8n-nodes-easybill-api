import { INodeProperties } from 'n8n-workflow';

export const discountPositionGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['discountPositionGroup'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a position group discount',
				description: 'Create a new position group discount',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a position group discount',
				description: 'Delete a position group discount by ID',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a position group discount',
				description: 'Get a position group discount by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many position group discounts',
				description: 'Get a list of position group discounts',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a position group discount',
				description: 'Update a position group discount by ID',
			},
		],
		default: 'getAll',
	},
];

export const discountPositionGroupFields: INodeProperties[] = [
	{
		displayName: 'Discount Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDiscountPositionGroupOptions',
		},
		description:
			'ID of the position group discount. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Customer Name or ID',
		name: 'customerId',
		type: 'options',
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadCustomerOptions',
		},
		description:
			'ID of the customer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Position Group Name or ID',
		name: 'positionGroupId',
		type: 'options',
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPositionGroupOptions',
		},
		description:
			'ID of the position group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Discount Value',
		name: 'discount',
		type: 'number',
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['create', 'update'] } },
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
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['create', 'update'] } },
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
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Customer ID Filter',
		name: 'customerIdFilter',
		type: 'string',
		displayOptions: { show: { resource: ['discountPositionGroup'], operation: ['getAll'] } },
		default: '',
		description: 'Filter by customer_id (comma-separated)',
	},
];

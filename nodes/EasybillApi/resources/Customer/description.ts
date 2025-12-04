import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a customer', description: 'Create a new customer' },
			{ name: 'Delete', value: 'delete', action: 'Delete a customer', description: 'Delete a customer by ID' },
			{ name: 'Get', value: 'get', action: 'Get a customer', description: 'Get a customer by ID' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many customers', description: 'Get a list of customers' },
			{ name: 'Update', value: 'update', action: 'Update a customer', description: 'Update a customer by ID' },
		],
		default: 'getAll',
	},
];

export const customerFields: INodeProperties[] = [
	// ID parameter
	{
		displayName: 'Customer Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadCustomerOptions',
		},
		description:
			'ID of the customer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	// Create/Update Required Fields
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The last name of the customer',
	},
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The company name of the customer',
	},
	// Additional Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Additional fields for the customer',
		options: [
			{ displayName: 'City', name: 'city', type: 'string', default: '', description: 'The city of the customer' },
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'DE',
				description: 'The country of the customer',
			},
			{ displayName: 'Email', name: 'emails', type: 'string', default: '', description: 'Comma-separated emails' },
			{ displayName: 'Fax', name: 'fax', type: 'string', default: '', description: 'The fax number of the customer' },
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'The first name of the customer',
			},
			{
				displayName: 'Group Name or ID',
				name: 'group_id',
				type: 'options',
				default: '',
				description:
					'ID of the customer group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: { loadOptionsMethod: 'loadCustomerGroupOptions' },
			},
			{
				displayName: 'Mobile',
				name: 'mobile',
				type: 'string',
				default: '',
				description: 'The mobile number of the customer',
			},
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'A note for the customer' },
			{
				displayName: 'Phone 1',
				name: 'phone_1',
				type: 'string',
				default: '',
				description: 'The primary phone number of the customer',
			},
			{
				displayName: 'Phone 2',
				name: 'phone_2',
				type: 'string',
				default: '',
				description: 'The secondary phone number of the customer',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'number',
				default: 0,
				description: '0: empty, 1: Herrn, 2: Frau, 3: Firma, 4: Herrn und Frau, 5: Eheleute, 6: Familie',
			},
			{ displayName: 'State', name: 'state', type: 'string', default: '', description: 'The state of the customer' },
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				description: 'The street address of the customer',
			},
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'The title of the customer' },
			{
				displayName: 'Zip Code',
				name: 'zip_code',
				type: 'string',
				default: '',
				description: 'The zip code of the customer',
			},
		],
	},
	// Get All Filters
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		description: 'Filters to apply to the customer list',
		options: [
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				description: 'Filter by company name',
			},
			{ displayName: 'Email', name: 'emails', type: 'string', default: '', description: 'Filter by email' },
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'Filter by first name',
			},
			{ displayName: 'Group ID', name: 'group_id', type: 'string', default: '', description: 'Filter by group ID' },
			{ displayName: 'Last Name', name: 'last_name', type: 'string', default: '', description: 'Filter by last name' },
			{ displayName: 'Number', name: 'number', type: 'string', default: '', description: 'Filter by customer number' },
			{ displayName: 'Zip Code', name: 'zip_code', type: 'string', default: '', description: 'Filter by zip code' },
		],
	},
];

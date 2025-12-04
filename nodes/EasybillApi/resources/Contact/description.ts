import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Create a new contact for a customer',
			},
			{ name: 'Delete', value: 'delete', action: 'Delete a contact', description: 'Delete a contact by ID' },
			{ name: 'Get', value: 'get', action: 'Get a contact', description: 'Get a contact by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many contacts',
				description: 'Get a list of contacts for a customer',
			},
			{ name: 'Update', value: 'update', action: 'Update a contact', description: 'Update a contact by ID' },
		],
		default: 'getAll',
	},
];

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Customer Name or ID',
		name: 'customerId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		default: '',
		required: true,
		description:
			'ID of the customer the contact belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'loadCustomerOptions',
		},
	},
	{
		displayName: 'Contact Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadContactOptions',
		},
		description:
			'ID of the contact. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The city of the contact',
	},
	{
		displayName: 'Street',
		name: 'street',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The street of the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
		description: 'Additional fields for the contact',
		options: [
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				description: 'The company name of the contact',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'DE',
				description: 'The country of the contact',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
				description: 'The department of the contact',
			},
			{ displayName: 'Email', name: 'emails', type: 'string', default: '', description: 'Comma-separated emails' },
			{ displayName: 'Fax', name: 'fax', type: 'string', default: '', description: 'The fax number of the contact' },
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'The first name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'The last name of the contact',
			},
			{
				displayName: 'Mobile',
				name: 'mobile',
				type: 'string',
				default: '',
				description: 'The mobile number of the contact',
			},
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'A note for the contact' },
			{
				displayName: 'Personal',
				name: 'personal',
				type: 'boolean',
				default: false,
				description: 'Whether the contact is personal',
			},
			{
				displayName: 'Phone 1',
				name: 'phone_1',
				type: 'string',
				default: '',
				description: 'The primary phone number of the contact',
			},
			{
				displayName: 'Phone 2',
				name: 'phone_2',
				type: 'string',
				default: '',
				description: 'The secondary phone number of the contact',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'number',
				default: 0,
				description: 'The salutation of the contact',
			},
			{ displayName: 'State', name: 'state', type: 'string', default: '', description: 'The state of the contact' },
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'The title of the contact' },
			{
				displayName: 'Zip Code',
				name: 'zip_code',
				type: 'string',
				default: '',
				description: 'The zip code of the contact',
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
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getAll'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

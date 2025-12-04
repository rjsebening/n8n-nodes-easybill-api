import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a task' },
			{ name: 'Delete', value: 'delete', action: 'Delete a task' },
			{ name: 'Get', value: 'get', action: 'Get a task' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many tasks' },
			{ name: 'Update', value: 'update', action: 'Update a task' },
		],
		default: 'getAll',
	},
];

export const taskFields: INodeProperties[] = [
	{
		displayName: 'Task Name or ID',
		name: 'id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadTaskOptions',
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{ name: 'Cancel', value: 'CANCEL' },
			{ name: 'Done', value: 'DONE' },
			{ name: 'Processing', value: 'PROCESSING' },
			{ name: 'Waiting', value: 'WAITING' },
		],
		default: 'PROCESSING',
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		options: [
			// Category
			{ displayName: 'Category', name: 'category', type: 'string', default: '' },

			// Customer Name or ID
			{
				displayName: 'Customer Name or ID',
				name: 'customer_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadCustomerOptions' },
			},

			// Description
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },

			// Document Name or ID
			{
				displayName: 'Document Name or ID',
				name: 'document_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadDocumentOptions' },
			},

			// End At
			{ displayName: 'End At', name: 'end_at', type: 'dateTime', default: '' },

			// Position Name or ID
			{
				displayName: 'Position Name or ID',
				name: 'position_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadPositionOptions' },
			},

			// Priority (mit eingebetteten Optionen)
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'High', value: 'HIGH' },
					{ name: 'Low', value: 'LOW' },
					{ name: 'Normal', value: 'NORMAL' },
				],
				default: 'LOW',
			},

			// Project Name or ID
			{
				displayName: 'Project Name or ID',
				name: 'project_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadProjectOptions' },
			},

			// Start At
			{ displayName: 'Start At', name: 'start_at', type: 'dateTime', default: '' },
		],
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		default: 50,
	},
];

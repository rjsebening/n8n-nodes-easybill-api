import { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['project'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a project', description: 'Create a new project' },
			{ name: 'Delete', value: 'delete', action: 'Delete a project', description: 'Delete a project by ID' },
			{ name: 'Get', value: 'get', action: 'Get a project', description: 'Get a project by ID' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many projects', description: 'Get a list of projects' },
			{ name: 'Update', value: 'update', action: 'Update a project', description: 'Update a project by ID' },
		],
		default: 'getAll',
	},
];

export const projectFields: INodeProperties[] = [
	{
		displayName: 'Project Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['project'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadProjectOptions',
		},
		description:
			'ID of the project. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: { show: { resource: ['project'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Name of the project',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['project'], operation: ['create', 'update'] } },
		description: 'Additional fields for the project',
		options: [
			{
				displayName: 'Budget Amount (Cents)',
				name: 'budget_amount',
				type: 'number',
				default: 0,
				description: 'The budget amount in cents',
			},

			{
				displayName: 'Budget Time (Minutes)',
				name: 'budget_time',
				type: 'number',
				default: 0,
				description: 'The time budget in minutes',
			},

			{
				displayName: 'Customer Name or ID',
				name: 'customer_id',
				type: 'options',
				default: '',
				description:
					'ID of the customer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: {
					loadOptionsMethod: 'loadCustomerOptions',
				},
			},

			{
				displayName: 'Hourly Rate (Cents)',
				name: 'hourly_rate',
				type: 'number',
				default: 0,
				description: 'The hourly rate in cents',
			},

			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'A note for the project',
			},

			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'OPEN' },
					{ name: 'Cancel', value: 'CANCEL' },
					{ name: 'Done', value: 'DONE' },
				],
				default: 'OPEN',
				description: 'The status of the project',
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
		displayOptions: { show: { resource: ['project'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

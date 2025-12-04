import { INodeProperties } from 'n8n-workflow';

export const timeTrackingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['timeTracking'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a time tracking entry' },
			{ name: 'Delete', value: 'delete', action: 'Delete a time tracking entry' },
			{ name: 'Get', value: 'get', action: 'Get a time tracking entry' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many time tracking entries' },
			{ name: 'Update', value: 'update', action: 'Update a time tracking entry' },
		],
		default: 'getAll',
	},
];

export const timeTrackingFields: INodeProperties[] = [
	{
		displayName: 'Entry Name or ID',
		name: 'id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadTimeTrackingOptions',
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['create', 'update'],
			},
		},
		default: '',
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
				resource: ['timeTracking'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{ displayName: 'Date From', name: 'date_from_at', type: 'dateTime', default: '' },
			{ displayName: 'Date Thru', name: 'date_thru_at', type: 'dateTime', default: '' },
			{ displayName: 'Hourly Rate (Cents)', name: 'hourly_rate', type: 'number', default: 0 },
			{
				displayName: 'Login Name or ID',
				name: 'login_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'loadLoginOptions',
				},
			},
			{ displayName: 'Note', name: 'note', type: 'string', default: '' },
			{
				displayName: 'Position Name or ID',
				name: 'position_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'loadPositionOptions',
				},
			},
			{
				displayName: 'Project Name or ID',
				name: 'project_id',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'loadProjectOptions',
				},
			},
			{ displayName: 'Timer Value (Minutes)', name: 'timer_value', type: 'number', default: 0 },
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
				resource: ['timeTracking'],
				operation: ['getAll'],
			},
		},
		default: 50,
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['getAll'],
			},
		},
		options: [
			{ displayName: 'Date From', name: 'date_from_at', type: 'dateTime', default: '' },
			{ displayName: 'Date Thru', name: 'date_thru_at', type: 'dateTime', default: '' },
			{ displayName: 'Login ID', name: 'login_id', type: 'string', default: '' },
			{ displayName: 'Project ID', name: 'project_id', type: 'string', default: '' },
		],
	},
];

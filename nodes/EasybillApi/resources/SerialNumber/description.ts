import { INodeProperties } from 'n8n-workflow';

export const serialNumberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['serialNumber'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a serial number', description: 'Create a new serial number' },
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a serial number',
				description: 'Delete a serial number by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a serial number', description: 'Get a serial number by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many serial numbers',
				description: 'Get a list of serial numbers',
			},
		],
		default: 'getAll',
	},
];

export const serialNumberFields: INodeProperties[] = [
	{
		displayName: 'Serial Number Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['serialNumber'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadSerialNumberOptions',
		},
		description:
			'ID of the serial number. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Serial Number',
		name: 'serialNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['serialNumber'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Position Name or ID',
		name: 'positionId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['serialNumber'],
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
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['serialNumber'],
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
				resource: ['serialNumber'],
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
				displayName: 'In Use',
				name: 'in_use',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by usage status',
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

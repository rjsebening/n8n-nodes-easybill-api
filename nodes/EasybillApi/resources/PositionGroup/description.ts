import { INodeProperties } from 'n8n-workflow';

export const positionGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['positionGroup'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a position group',
				description: 'Create a new position group',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a position group',
				description: 'Delete a position group by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a position group', description: 'Get a position group by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many position groups',
				description: 'Get a list of position groups',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a position group',
				description: 'Update a position group by ID',
			},
		],
		default: 'getAll',
	},
];

export const positionGroupFields: INodeProperties[] = [
	{
		displayName: 'Group Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['positionGroup'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadPositionGroupOptions',
		},
		description:
			'ID of the position group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: { show: { resource: ['positionGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Name of the position group',
	},
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		displayOptions: { show: { resource: ['positionGroup'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Number of the position group',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: { show: { resource: ['positionGroup'], operation: ['create', 'update'] } },
		default: '',
		description: 'Description of the position group',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['positionGroup'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

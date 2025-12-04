import { INodeProperties } from 'n8n-workflow';

export const textTemplateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['textTemplate'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a text template', description: 'Create a new text template' },
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a text template',
				description: 'Delete a text template by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a text template', description: 'Get a text template by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many text templates',
				description: 'Get a list of text templates',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a text template',
				description: 'Update a text template by ID',
			},
		],
		default: 'getAll',
	},
];

export const textTemplateFields: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['textTemplate'], operation: ['get', 'delete', 'update'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadTextTemplateOptions',
		},
		description:
			'ID of the text template. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: { show: { resource: ['textTemplate'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'Title of the text template',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		displayOptions: { show: { resource: ['textTemplate'], operation: ['create', 'update'] } },
		default: '',
		required: true,
		description: 'The content of the text template',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['textTemplate'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

import { INodeProperties } from 'n8n-workflow';

export const documentVersionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['documentVersion'] } },
		options: [
			{
				name: 'Download Item',
				value: 'downloadItem',
				action: 'Download a specific file for a single version',
				description: 'Download an item from a document version',
			},
			{ name: 'Get', value: 'get', action: 'Get a document version', description: 'Get a document version by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many document versions',
				description: 'Get a list of document versions',
			},
		],
		default: 'getAll',
	},
];

export const documentVersionFields: INodeProperties[] = [
	{
		displayName: 'Document Name or ID',
		name: 'documentId',
		type: 'options',
		displayOptions: { show: { resource: ['documentVersion'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDocumentOptions',
		},
		description:
			'ID of the document. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Version Name or ID',
		name: 'versionId',
		type: 'options',
		displayOptions: { show: { resource: ['documentVersion'], operation: ['get', 'downloadItem'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDocumentVersionOptions',
		},
		description:
			'ID of the document version. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Version Item ID',
		name: 'versionItemId',
		type: 'number', // This is dynamic and cannot be easily loaded without a dependent loader.
		displayOptions: { show: { resource: ['documentVersion'], operation: ['downloadItem'] } },
		default: 0,
		required: true,
		description: 'ID of the document version item',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['documentVersion'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];

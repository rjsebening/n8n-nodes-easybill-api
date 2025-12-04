import { INodeProperties } from 'n8n-workflow';

export const attachmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attachment'],
			},
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create an attachment', description: 'Create a new attachment' },
			{ name: 'Delete', value: 'delete', action: 'Delete an attachment', description: 'Delete an attachment by ID' },
			{ name: 'Get', value: 'get', action: 'Get an attachment', description: 'Get an attachment by ID' },
			{
				name: 'Get Content',
				value: 'getContent',
				action: 'Get attachment content',
				description: 'Download the binary content of an attachment',
			},
			{ name: 'Get Many', value: 'getAll', action: 'Get many attachments', description: 'Get a list of attachments' },
			{ name: 'Update', value: 'update', action: 'Update an attachment', description: 'Update an attachment by ID' },
		],
		default: 'getAll',
	},
];

export const attachmentFields: INodeProperties[] = [
	{
		displayName: 'Attachment Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['attachment'],
				operation: ['delete', 'get', 'getContent', 'update'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadAttachmentOptions',
		},
		description:
			'ID of the attachment. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['attachment'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the file to upload',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['attachment'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'Name of the binary property on the input item containing the file data to upload',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['attachment'],
				operation: ['create', 'update'],
			},
		},
		description: 'Additional fields for the attachment',
		options: [
			{
				displayName: 'Customer Name or ID',
				name: 'customer_id',
				type: 'options',
				default: '',
				description:
					'The ID of the customer to associate the attachment with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: { loadOptionsMethod: 'loadCustomerOptions' },
			},
			{
				displayName: 'Document Name or ID',
				name: 'document_id',
				type: 'options',
				default: '',
				description:
					'The ID of the document to associate the attachment with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: { loadOptionsMethod: 'loadDocumentOptions' },
			},
			{
				displayName: 'Project Name or ID',
				name: 'project_id',
				type: 'options',
				default: '',
				description:
					'The ID of the project to associate the attachment with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: { loadOptionsMethod: 'loadProjectOptions' },
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
				resource: ['attachment'],
				operation: ['getAll'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['attachment'],
				operation: ['getAll'],
			},
		},
		default: 1,
		description: 'Page number to return',
	},
];

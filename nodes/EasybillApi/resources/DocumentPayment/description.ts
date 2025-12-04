import { INodeProperties } from 'n8n-workflow';

export const documentPaymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['documentPayment'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a document payment',
				description: 'Create a new document payment',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a document payment',
				description: 'Delete a document payment by ID',
			},
			{ name: 'Get', value: 'get', action: 'Get a document payment', description: 'Get a document payment by ID' },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many document payments',
				description: 'Get a list of document payments',
			},
		],
		default: 'getAll',
	},
];

export const documentPaymentFields: INodeProperties[] = [
	{
		displayName: 'Payment Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['get', 'delete'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDocumentPaymentOptions',
		},
		description:
			'ID of the document payment. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Document Name or ID',
		name: 'documentId',
		type: 'options',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDocumentOptions',
		},
		description:
			'ID of the document. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: 0,
		required: true,
		description: 'Amount in cents (e.g. "150" = 1.50€)',
	},
	{
		displayName: 'Payment Date',
		name: 'paymentAt',
		type: 'string',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		description: 'Format: YYYY-MM-DD',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		description: 'The payment type',
	},
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'string',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		description: 'The payment provider',
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		description: 'The payment reference',
	},
	{
		displayName: 'Notice',
		name: 'notice',
		type: 'string',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: '',
		description: 'A notice for the payment',
	},
	{
		displayName: 'Paid',
		name: 'paid',
		type: 'boolean',
		displayOptions: { show: { resource: ['documentPayment'], operation: ['create'] } },
		default: false,
		description: 'Whether to mark the document as paid when the amount matches',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: { resource: ['documentPayment'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['documentPayment'], operation: ['getAll'] } },
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
				displayName: 'Payment Date',
				name: 'payment_at',
				type: 'string',
				default: '',
				description: 'Filter by payment date',
			},
			{ displayName: 'Reference', name: 'reference', type: 'string', default: '', description: 'Filter by reference' },
		],
	},
];

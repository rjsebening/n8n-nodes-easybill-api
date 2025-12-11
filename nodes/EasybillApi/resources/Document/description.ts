import { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{ name: 'Cancel', value: 'cancel', action: 'Cancel a document', description: 'Cancel a document' },
			{
				name: 'Convert',
				value: 'convert',
				action: 'Convert a document type',
				description: 'Convert a document to another type',
			},
			{ name: 'Create', value: 'create', action: 'Create a document', description: 'Create a new document' },
			{ name: 'Delete', value: 'delete', action: 'Delete a document', description: 'Delete a document by ID' },
			{
				name: 'Download',
				value: 'download',
				action: 'Download document custom format',
				description: 'Download document in a specific format',
			},
			{ name: 'Finish', value: 'done', action: 'Mark document as finished', description: 'Complete a document' },
			{ name: 'Get', value: 'get', action: 'Get a document', description: 'Get a document by ID' },
			{
				name: 'Get JPG',
				value: 'getJpg',
				action: 'Download document as JPG',
				description: 'Get the JPG version of a document',
			},
			{ name: 'Get Many', value: 'getAll', action: 'Get many documents', description: 'Get a list of documents' },
			{
				name: 'Get PDF',
				value: 'getPdf',
				action: 'Download document as PDF',
				description: 'Get the PDF version of a document',
			},
			{ name: 'Send', value: 'send', action: 'Send a document email fax post', description: 'Send a document' },
			{ name: 'Update', value: 'update', action: 'Update a document', description: 'Update a document by ID' },
		],
		default: 'getAll',
	},
];

export const documentFields: INodeProperties[] = [
	// ID
	{
		displayName: 'Document Name or ID',
		name: 'id',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'delete', 'update', 'send', 'done', 'cancel', 'convert', 'getPdf', 'getJpg', 'download'],
			},
		},
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'loadDocumentOptions',
		},
		description:
			'ID of the document. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	// Send Params
	{
		displayName: 'Send Type',
		name: 'sendType',
		type: 'options',
		options: [
			{ name: 'Email', value: 'email' },
			{ name: 'Fax', value: 'fax' },
			{ name: 'Post', value: 'post' },
		],
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['send'],
			},
		},
		default: 'email',
		description: 'The type of dispatch',
	},
	// Send Additional Fields
	{
		displayName: 'Send Options',
		name: 'sendOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['send'],
			},
		},
		description: 'Options for sending the document',
		options: [
			{ displayName: 'CC', name: 'cc', type: 'string', default: '', description: 'CC address' },
			{ displayName: 'Date', name: 'date', type: 'string', default: '', description: 'Date of sending' },
			{
				displayName: 'Document File Type',
				name: 'document_file_type',
				type: 'options',
				options: [
					{ name: 'Default', value: 'default' },
					{ displayName: 'From', name: 'from', type: 'string', default: '', description: 'Sender address' },
					{ displayName: 'Message', name: 'message', type: 'string', default: '', description: 'Email message' },
					{
						displayName: 'Send By Self',
						name: 'send_by_self',
						type: 'boolean',
						default: false,
						description: 'Whether to send a copy to yourself',
					},
					{
						displayName: 'Send With Attachment',
						name: 'send_with_attachment',
						type: 'boolean',
						default: true,
						description: 'Whether to include the document as attachment',
					},
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '', description: 'Email subject' },
					{ displayName: 'To', name: 'to', type: 'string', default: '', description: 'Recipient address' },
					{ name: 'XRechnung', value: 'xrechnung' },
					{ name: 'ZUGFeRD 1', value: 'zugferd1' },
				],
				default: 'default',
				description: 'The file format',
			},
			{
				displayName: 'Post Send Type',
				name: 'post_send_type',
				type: 'options',
				options: [
					{ name: 'Registered', value: 'post_send_type_registered' },
					{ name: 'Standard', value: 'post_send_type_standard' },
				],
				default: 'post_send_type_standard',
				description: 'The type of postal dispatch',
			},
		],
	},
	// Convert Params
	{
		displayName: 'Target Type',
		name: 'targetType',
		type: 'options',
		options: [
			{ name: 'Charge', value: 'CHARGE' },
			{ name: 'Charge Confirm', value: 'CHARGE_CONFIRM' },
			{ name: 'Credit', value: 'CREDIT' },
			{ name: 'Delivery', value: 'DELIVERY' },
			{ name: 'Dunning', value: 'DUNNING' },
			{ name: 'Invoice', value: 'INVOICE' },
			{ name: 'Offer', value: 'OFFER' },
			{ name: 'Order', value: 'ORDER' },
			{ name: 'Reminder', value: 'REMINDER' },
		],
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
			},
		},
		default: 'INVOICE',
		description: 'The target document type to convert to',
	},
	// Download Params
	{
		displayName: 'Accept Header',
		name: 'acceptHeader',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['download'],
			},
		},
		options: [
			{
				name: 'PDF (Only ZUGFeRD / Embedded PDF Supported)',
				value: 'application/pdf',
				description: 'Only works for invoices with embedded ZUGFeRD PDF payload',
			},
			{
				name: 'JSON',
				value: 'application/json',
				description: 'Returns machine-readable JSON structure of the document',
			},
			{
				name: 'XML',
				value: 'application/xml',
				description: 'Returns XML structure',
			},
			{
				name: 'UBL XML',
				value: 'application/vnd.ubl+xml',
				description: 'Universal Business Language format for digital invoicing',
			},
		],
		default: 'application/json',
		description: 'Defines the MIME type for the download endpoint. Only some formats are supported by Easybill.',
	},

	// Create/Update
	{
		displayName: 'Customer Name or ID',
		name: 'customerId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		typeOptions: {
			loadOptionsMethod: 'loadCustomerOptions',
		},
		description:
			'ID of the customer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Charge', value: 'CHARGE' },
			{ name: 'Charge Confirm', value: 'CHARGE_CONFIRM' },
			{ name: 'Credit', value: 'CREDIT' },
			{ name: 'Delivery', value: 'DELIVERY' },
			{ name: 'Dunning', value: 'DUNNING' },
			{ name: 'Invoice', value: 'INVOICE' },
			{ name: 'Letter', value: 'LETTER' },
			{ name: 'Offer', value: 'OFFER' },
			{ name: 'Order', value: 'ORDER' },
			{ name: 'Proforma Invoice', value: 'PROFORMA_INVOICE' },
			{ name: 'Reminder', value: 'REMINDER' },
			{ name: 'Storno', value: 'STORNO' },
			{ name: 'Storno Credit', value: 'STORNO_CREDIT' },
			{ name: 'Storno Proforma Invoice', value: 'STORNO_PROFORMA_INVOICE' },
		],
		default: 'INVOICE',
		description: 'The type of the document',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Items JSON',
		name: 'itemsJson',
		type: 'json',
		default: `[
					{
					"number": "ART-12345",
					"description": "Professionelle Webentwicklung",
					"document_note": "Test Note",
					"quantity": 1,
					"quantity_str": "1:30 h",
					"unit": "Stunde",
					"type": "POSITION",
					"position": 1,
					"single_price_net": 75,
					"single_price_gross": 0,
					"vat_percent": 0,
					"discount": 10,
					"discount_type": "PERCENT",
					"position_id": 123456,
					"booking_account": "8400",
					"export_cost_1": "Kostenstelle 100",
					"export_cost_2": "Projekt ABC",
					"cost_price_net": 45.5,
					"itemType": "UNDEFINED"
					}
				]`,
		description:
			'Provide an array of Easybill items. Example: [{ "position_id": 123, "quantity": 2 }]. This overrides all other item inputs.',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'update'],
			},
		},
		description: 'Additional fields for the document',
		options: [
			// A
			{
				displayName: 'Anonymize Due Date',
				name: 'anonymize_due_date',
				type: 'dateTime',
				default: '',
				description: 'Date when to anonymize the document',
			},
			{
				displayName: 'Bank Debit Form',
				name: 'bank_debit_form',
				type: 'string',
				default: '',
				description: 'Content for bank debit form',
			},
			{
				displayName: 'Buyer Reference',
				name: 'buyer_reference',
				type: 'string',
				default: '',
				description: 'Buyer reference (ZUGFeRD/XRechnung Leitweg-ID)',
			},

			// C
			{
				displayName: 'Calc VAT From',
				name: 'calc_vat_from',
				type: 'options',
				options: [
					{ name: 'Gross', value: 1 },
					{ name: 'Net', value: 0 },
				],
				default: 0,
				description: 'Calculation basis for VAT',
			},
			{
				displayName: 'Cash Allowance',
				name: 'cash_allowance',
				type: 'number',
				default: '',
				description: 'Cash allowance percentage',
			},
			{
				displayName: 'Cash Allowance Days',
				name: 'cash_allowance_days',
				type: 'number',
				default: '',
				description: 'Days for cash allowance',
			},
			{
				displayName: 'Cash Allowance Text',
				name: 'cash_allowance_text',
				type: 'string',
				default: '',
				description: 'Text for cash allowance',
			},
			{
				displayName: 'Contact Label',
				name: 'contact_label',
				type: 'string',
				default: '',
				description: 'Label for contact on the document',
			},
			{
				displayName: 'Contact Name or ID',
				name: 'contact_id',
				type: 'options',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadContactOptions' },
				description:
					'Internal Easybill contact ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Contact Text',
				name: 'contact_text',
				type: 'string',
				default: '',
				description: 'Free text related to the contact',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'EUR',
				description: 'Document currency code',
			},

			// D
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'string',
				default: '',
				description: 'Discount value',
			},
			{
				displayName: 'Discount Type',
				name: 'discount_type',
				type: 'options',
				options: [
					{ name: 'Percent', value: 'PERCENT' },
					{ name: 'Amount', value: 'AMOUNT' },
				],
				default: 'PERCENT',
				description: 'Type of the discount',
			},
			{
				displayName: 'Document Date',
				name: 'document_date',
				type: 'dateTime',
				default: '',
				description: 'Date of the document',
			},
			{
				displayName: 'Due In Days',
				name: 'due_in_days',
				type: 'number',
				default: '',
				description: 'Due date offset in days',
			},

			// E
			{
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
				description: 'Your external reference ID',
			},

			// F
			{
				displayName: 'File Format Config',
				name: 'file_format_config',
				type: 'json',
				default: `[{ "type": "default" }]`,
				description: 'File format configuration for exports',
			},
			{
				displayName: 'Fulfillment Country',
				name: 'fulfillment_country',
				type: 'string',
				default: '',
				description: 'Country of fulfillment',
			},

			// G
			{
				displayName: 'Grace Period',
				name: 'grace_period',
				type: 'number',
				default: '',
				description: 'Grace period (alias of due_in_days)',
			},

			// I
			{
				displayName: 'Is Acceptable On Public Domain',
				name: 'is_acceptable_on_public_domain',
				type: 'boolean',
				default: false,
				description: 'Whether document can be accepted by customer via public page',
			},
			{
				displayName: 'Is Archive',
				name: 'is_archive',
				type: 'boolean',
				default: false,
				description: 'Whether the document is archived',
			},
			{
				displayName: 'Is OSS',
				name: 'is_oss',
				type: 'boolean',
				default: false,
				description: 'Whether the document should be marked as a One-Stop-Shop (OSS)',
			},
			{
				displayName: 'Is Replica',
				name: 'is_replica',
				type: 'boolean',
				default: false,
				description: 'Whether the document should be marked as a replica',
			},

			// L
			{
				displayName: 'Login Name or ID',
				name: 'login_id',
				type: 'options',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadLoginOptions' },
				description:
					'Login ID (admin/employee). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},

			// N
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Document number (leave empty for auto-generation)',
			},

			// O
			{
				displayName: 'Order Number',
				name: 'order_number',
				type: 'string',
				default: '',
				description: 'Optional order reference',
			},

			// P
			{
				displayName: 'PDF Template Name or ID',
				name: 'pdf_template',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'loadPDFTemplateOptionsByType',
					loadOptionsDependsOn: ['type'],
				},
				description:
					'ID or name of the PDF template. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Project Name or ID',
				name: 'project_id',
				type: 'options',
				default: '',
				typeOptions: { loadOptionsMethod: 'loadProjectOptions' },
				description:
					'Project ID tied to this document. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},

			// R
			{
				displayName: 'Recurring Options',
				name: 'recurring_options',
				type: 'json',
				default: `{
				"next_date": "2025-01-01",
				"frequency": "MONTHLY",
				"interval": 1,
				"status": "WAITING",
				"target_type": "INVOICE"
			}`,
				description: 'Recurring document settings',
			},
			{
				displayName: 'Ref ID',
				name: 'ref_id',
				type: 'number',
				default: '',
				description: 'Reference to another document',
			},
			{
				displayName: 'Replica URL',
				name: 'replica_url',
				type: 'string',
				default: '',
				description: 'URL for replica documents',
			},

			// S
			{
				displayName: 'Service Date',
				name: 'service_date',
				type: 'json',
				default: `{
				"type": "DEFAULT",
				"date": null
			}`,
				description: 'Service or delivery date information',
			},
			{
				displayName: 'Shipping Country',
				name: 'shipping_country',
				type: 'string',
				default: '',
				description: 'Shipping country code',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Accept', value: 'ACCEPT' },
					{ name: 'Cancel', value: 'CANCEL' },
					{ name: 'Done', value: 'DONE' },
					{ name: 'Dropshipping', value: 'DROPSHIPPING' },
				],
				default: 'ACCEPT',
				description: 'Document status (only for OFFER/ORDER/DELIVERY/CHARGE)',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'Main text for the document',
			},
			{
				displayName: 'Text Prefix',
				name: 'text_prefix',
				type: 'string',
				default: '',
				description: 'Introductory text before items',
			},
			{
				displayName: 'Text Tax',
				name: 'text_tax',
				type: 'string',
				default: '',
				description: 'Tax text override',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Document title (NOT the number)',
			},

			// U
			{
				displayName: 'Use Shipping Address',
				name: 'use_shipping_address',
				type: 'boolean',
				default: false,
				description: 'Whether to use the customer shipping address',
			},

			// V
			{
				displayName: 'VAT Country',
				name: 'vat_country',
				type: 'string',
				default: '',
				description: 'VAT country code',
			},
			{
				displayName: 'VAT Option',
				name: 'vat_option',
				type: 'options',
				options: [
					{ name: 'AL', value: 'AL' },
					{ name: 'IG', value: 'IG' },
					{ name: 'nStb', value: 'nStb' },
					{ name: 'nStbIm', value: 'nStbIm' },
					{ name: 'nStbNoneUstID', value: 'nStbNoneUstID' },
					{ name: 'nStbUstID', value: 'nStbUstID' },
					{ name: 'NULL', value: 'NULL' },
					{ name: 'Revc', value: 'revc' },
					{ name: 'smallBusiness', value: 'smallBusiness' },
					{ name: 'sStfr', value: 'sStfr' },
				],
				default: 'NULL',
				description: 'Select the VAT option',
			},
		],
	},

	// Filters
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['document'],
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
				resource: ['document'],
				operation: ['getAll'],
			},
		},
		description: 'Filters to apply to the document list',
		options: [
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},

			{
				displayName: 'Draft Only',
				name: 'is_draft',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by draft status',
			},
			{ displayName: 'Number', name: 'number', type: 'string', default: '', description: 'Filter by document number' },
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Filter by document title' },
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Invoice', value: 'INVOICE' },
					{ name: 'Credit', value: 'CREDIT' },
					{ name: 'Offer', value: 'OFFER' },
				],
				default: 'INVOICE',
				description: 'Filter by document type',
			},
		],
	},
];

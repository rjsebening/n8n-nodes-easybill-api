import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	INodeExecutionData,
	IHookFunctions,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { easybillApiRequest, toNodeError } from './transport/request';

export class EasybillApiTrigger implements INodeType {
	// Kept inline rather than in a module-level const: the community-node lint rules only read
	// the icon (and the other description fields) off an object literal on the class.
	description: INodeTypeDescription = {
		displayName: 'Easybill Trigger',
		name: 'easybillApiTrigger',
		icon: {
			light: 'file:./icons/icon-light.svg',
			dark: 'file:./icons/icon-dark.svg',
		},
		group: ['trigger'],
		version: 1,
		// A trigger has nothing to execute as a tool, so it is hidden from the node creator.
		// The property itself is required by the community-node rules.
		usableAsTool: { replacements: { hidden: true } },
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts a workflow when an Easybill event occurs (powered by joergsebening.de)',
		defaults: {
			name: 'Easybill Trigger',
			// @ts-expect-error -- some linters require this
			description: 'Interact with Easybill API (powered by joergsebening.de)',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		webhooks: [{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', isFullPath: true, path: '' }],
		credentials: [
			{
				name: 'easybillApiBasicApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['basic'],
					},
				},
			},
			{
				name: 'easybillApiBearerApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['bearer'],
					},
				},
			},
		],

		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Bearer Token',
						value: 'bearer',
					},
					{
						name: 'Basic Auth',
						value: 'basic',
					},
				],
				default: 'bearer',
			},

			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The events that will trigger the webhook',
				options: [
					{ name: 'contact.create', value: 'contact.create', description: 'Triggered when a new contact is created' },
					{ name: 'contact.delete', value: 'contact.delete', description: 'Triggered when a contact is deleted' },
					{ name: 'contact.update', value: 'contact.update', description: 'Triggered when a contact is updated' },

					{ name: 'customer.create', value: 'customer.create', description: 'Triggered when a new customer is created' },
					{ name: 'customer.delete', value: 'customer.delete', description: 'Triggered when a customer is deleted' },
					{ name: 'customer.update', value: 'customer.update', description: 'Triggered when a customer is updated' },

					{
						name: 'document.completed',
						value: 'document.completed',
						description: 'Triggered when a document is marked completed',
					},
					{ name: 'document.create', value: 'document.create', description: 'Triggered when a new document is created' },
					{ name: 'document.deleted', value: 'document.deleted', description: 'Triggered when a document is deleted' },
					{
						name: 'document.payment_add',
						value: 'document.payment_add',
						description: 'Triggered when a payment is added to a document',
					},
					{
						name: 'document.payment_delete',
						value: 'document.payment_delete',
						description: 'Triggered when a payment is removed from a document',
					},
					{ name: 'document.update', value: 'document.update', description: 'Triggered when a document is updated' },

					{ name: 'position.create', value: 'position.create', description: 'Triggered when a new position is created' },
					{ name: 'position.delete', value: 'position.delete', description: 'Triggered when a position is deleted' },
					{ name: 'position.update', value: 'position.update', description: 'Triggered when a position is updated' },

					{
						name: 'postbox.create',
						value: 'postbox.create',
						description: 'Triggered when a new postbox entry is created',
					},
					{ name: 'postbox.delete', value: 'postbox.delete', description: 'Triggered when a postbox entry is deleted' },
					{ name: 'postbox.sent', value: 'postbox.sent', description: 'Triggered when a postbox entry is sent' },
					{ name: 'postbox.update', value: 'postbox.update', description: 'Triggered when a postbox entry is updated' },
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		return webhook.call(this);
	}

	// Written out as methods rather than shorthand references: the lifecycle lint rule only
	// recognises function expressions here. They delegate to the implementations below.
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return await checkExists.call(this);
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return await create.call(this);
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return await deleteWebhook.call(this);
			},
		},
	};
}

async function checkExists(this: IHookFunctions): Promise<boolean> {
	const webhookData = this.getWorkflowStaticData('node');

	if (!webhookData.webhookId) {
		return false;
	}

	try {
		await easybillApiRequest.call(this, 'GET', `/webhooks/${webhookData.webhookId}`);
	} catch (error: any) {
		if (error.message?.includes('404')) {
			return false;
		}
		throw toNodeError.call(this, error);
	}

	return true;
}

function generateSecret(length = 20) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

async function create(this: IHookFunctions): Promise<boolean> {
	const webhookUrl = (this as unknown as IWebhookFunctions).getNodeWebhookUrl('default');
	const events = this.getNodeParameter('events', []) as string[];

	const webhookData = this.getWorkflowStaticData('node');
	const globalData = this.getWorkflowStaticData('global');

	if (!globalData.webhookSecret) {
		globalData.webhookSecret = generateSecret(20);
	}

	webhookData.webhookSecret = globalData.webhookSecret;

	const body = {
		url: webhookUrl,
		events,
		content_type: 'json',
		is_active: true,
		description: 'n8n Easybill Webhook',
		secret: webhookData.webhookSecret,
	};

	const response = await easybillApiRequest.call(this, 'POST', '/webhooks', { body });

	if (!response?.id) return false;

	webhookData.webhookId = response.id;

	return true;
}

async function deleteWebhook(this: IHookFunctions): Promise<boolean> {
	const webhookData = this.getWorkflowStaticData('node');

	if (!webhookData.webhookId) return false;

	try {
		await easybillApiRequest.call(this, 'DELETE', `/webhooks/${webhookData.webhookId}`);
	} catch (error) {
		// Not rethrown: deactivation should not fail. Logged because a swallowed delete leaves
		// an orphaned webhook on the Easybill side.
		this.logger.error('Easybill: could not delete webhook', { error });
		return false;
	}

	delete webhookData.webhookId;
	delete webhookData.webhookSecret;

	return true;
}

export async function webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
	const body = this.getBodyData();

	const returnData: INodeExecutionData[] = [
		{
			json: body,
		},
	];

	return {
		workflowData: [this.helpers.returnJsonArray(returnData)],
	};
}

export { checkExists, create, deleteWebhook };

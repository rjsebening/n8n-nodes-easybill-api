import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { router } from './routing';

import * as Resources from './resources';

import * as loadOptions from './loadOptions';

export class EasybillApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Easybill',
		name: 'easybillApi',
		icon: {
			light: 'file:./icons/icon-light.svg',
			dark: 'file:./icons/icon-dark.svg',
		},
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Easybill API (powered by joergsebening.de)',
		defaults: {
			name: 'Easybill API',
			// @ts-expect-error
			description: 'Consume Easybill API (powered by joergsebening.de)',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: Resources.resourceOptions,
				default: 'customer',
			},
			// Resources
			...Resources.allResourceProperties,
		],
	};

	methods = {
		loadOptions,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}

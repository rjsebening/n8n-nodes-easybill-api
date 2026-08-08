import {
	ICredentialType,
	ICredentialTestRequest,
	Icon,
	INodeProperties,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class EasybillApiBasicApi implements ICredentialType {
	name = 'easybillApiBasicApi';
	displayName = 'Easybill API (Basic Auth) API';
	documentationUrl = 'https://api.easybill.de/rest/v1/CHANGELOG.md';
	icon: Icon = {
		light: 'file:../nodes/EasybillApi/icons/icon-light.svg',
		dark: 'file:../nodes/EasybillApi/icons/icon-dark.svg',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			required: true,
			default: '',
			description: 'Your Easybill Login Email',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your Easybill REST API Key',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.easybill.de/rest/v1',

			description: 'Base URL for the Easybill REST API. Do not include trailing slashes.',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.email}}',
				password: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/customers',
			method: 'GET',
			qs: { limit: 1 },
		},
	};
}

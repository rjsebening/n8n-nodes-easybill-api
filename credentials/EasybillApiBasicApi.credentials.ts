import { ICredentialType, INodeProperties, IAuthenticate } from 'n8n-workflow';

export class EasybillApiBasicApi implements ICredentialType {
	name = 'easybillApiBasicApi';
	displayName = 'Easybill API (Basic Auth) API';
	documentationUrl = 'https://api.easybill.de/rest/v1/CHANGELOG.md';

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

	authenticate: IAuthenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: 'Basic {{$base64Encode(`${$credentials.email}:${$credentials.apiKey}`)}}',
			},
		},
	};
}

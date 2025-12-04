import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class EasybillApiBearerApi implements ICredentialType {
	name = 'easybillApiBearerApi';
	displayName = 'Easybill (Bearer Token) API';
	documentationUrl = 'https://api.easybill.de/rest/v1/CHANGELOG.md';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'authToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your Easybill REST API Key / Auth Token',
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
			headers: {
				Authorization: 'Bearer {{$credentials.authToken}}',
			},
		},
	};
}

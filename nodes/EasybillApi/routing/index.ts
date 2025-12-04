import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as Raw from '../resources/Raw';
import * as Customer from '../resources/Customer';
import * as Document from '../resources/Document';
import * as Task from '../resources/Task';
import * as Project from '../resources/Project';
import * as Position from '../resources/Position';
import * as Stock from '../resources/Stock';
import * as Contact from '../resources/Contact';
import * as TimeTracking from '../resources/TimeTracking';
import * as Attachment from '../resources/Attachment';
import * as CustomerGroup from '../resources/CustomerGroup';
import * as DiscountPosition from '../resources/DiscountPosition';
import * as DiscountPositionGroup from '../resources/DiscountPositionGroup';
import * as DocumentPayment from '../resources/DocumentPayment';
import * as DocumentVersion from '../resources/DocumentVersion';
import * as Login from '../resources/Login';
import * as PDFTemplate from '../resources/PDFTemplate';
import * as PositionGroup from '../resources/PositionGroup';
import * as PostBox from '../resources/PostBox';
import * as SEPAPayment from '../resources/SEPAPayment';
import * as SerialNumber from '../resources/SerialNumber';
import * as TextTemplate from '../resources/TextTemplate';
import * as WebHook from '../resources/WebHook';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const resource = this.getNodeParameter('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0) as string;

	for (let i = 0; i < items.length; i++) {
		try {
			let responseData;

			if (resource === 'raw') {
				responseData = await Raw.handler.custom.call(this, i);
			} else if (resource === 'customer') {
				// @ts-ignore
				responseData = await Customer.handler[operation].call(this, i);
			} else if (resource === 'document') {
				// @ts-ignore
				responseData = await Document.handler[operation].call(this, i);
			} else if (resource === 'task') {
				// @ts-ignore
				responseData = await Task.handler[operation].call(this, i);
			} else if (resource === 'project') {
				// @ts-ignore
				responseData = await Project.handler[operation].call(this, i);
			} else if (resource === 'position') {
				// @ts-ignore
				responseData = await Position.handler[operation].call(this, i);
			} else if (resource === 'stock') {
				// @ts-ignore
				responseData = await Stock.handler[operation].call(this, i);
			} else if (resource === 'contact') {
				// @ts-ignore
				responseData = await Contact.handler[operation].call(this, i);
			} else if (resource === 'timeTracking') {
				// @ts-ignore
				responseData = await TimeTracking.handler[operation].call(this, i);
			} else if (resource === 'attachment') {
				// @ts-ignore
				responseData = await Attachment.handler[operation].call(this, i);
			} else if (resource === 'customerGroup') {
				// @ts-ignore
				responseData = await CustomerGroup.handler[operation].call(this, i);
			} else if (resource === 'discountPosition') {
				// @ts-ignore
				responseData = await DiscountPosition.handler[operation].call(this, i);
			} else if (resource === 'discountPositionGroup') {
				// @ts-ignore
				responseData = await DiscountPositionGroup.handler[operation].call(this, i);
			} else if (resource === 'documentPayment') {
				// @ts-ignore
				responseData = await DocumentPayment.handler[operation].call(this, i);
			} else if (resource === 'documentVersion') {
				// @ts-ignore
				responseData = await DocumentVersion.handler[operation].call(this, i);
			} else if (resource === 'login') {
				// @ts-ignore
				responseData = await Login.handler[operation].call(this, i);
			} else if (resource === 'pdfTemplate') {
				// @ts-ignore
				responseData = await PDFTemplate.handler[operation].call(this, i);
			} else if (resource === 'positionGroup') {
				// @ts-ignore
				responseData = await PositionGroup.handler[operation].call(this, i);
			} else if (resource === 'postBox') {
				// @ts-ignore
				responseData = await PostBox.handler[operation].call(this, i);
			} else if (resource === 'sepaPayment') {
				// @ts-ignore
				responseData = await SEPAPayment.handler[operation].call(this, i);
			} else if (resource === 'serialNumber') {
				// @ts-ignore
				responseData = await SerialNumber.handler[operation].call(this, i);
			} else if (resource === 'textTemplate') {
				// @ts-ignore
				responseData = await TextTemplate.handler[operation].call(this, i);
			} else if (resource === 'webHook') {
				// @ts-ignore
				responseData = await WebHook.handler[operation].call(this, i);
			}

			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData);
			} else {
				returnData.push(responseData as any);
			}
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message } });
				continue;
			}
			throw error;
		}
	}

	return [returnData];
}

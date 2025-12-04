import * as Raw from './Raw';
import * as Customer from './Customer';
import * as Document from './Document';
import * as Task from './Task';
import * as Project from './Project';
import * as Position from './Position';
import * as Stock from './Stock';
import * as Contact from './Contact';
import * as TimeTracking from './TimeTracking';
import * as Attachment from './Attachment';
import * as CustomerGroup from './CustomerGroup';
import * as DiscountPosition from './DiscountPosition';
import * as DiscountPositionGroup from './DiscountPositionGroup';
import * as DocumentPayment from './DocumentPayment';
import * as DocumentVersion from './DocumentVersion';
import * as Login from './Login';
import * as PDFTemplate from './PDFTemplate';
import * as PositionGroup from './PositionGroup';
import * as PostBox from './PostBox';
import * as SEPAPayment from './SEPAPayment';
import * as SerialNumber from './SerialNumber';
import * as TextTemplate from './TextTemplate';
import * as WebHook from './WebHook';

// Export all modules individually (optional)
export {
	Raw,
	Customer,
	Document,
	Task,
	Project,
	Position,
	Stock,
	Contact,
	TimeTracking,
	Attachment,
	CustomerGroup,
	DiscountPosition,
	DiscountPositionGroup,
	DocumentPayment,
	DocumentVersion,
	Login,
	PDFTemplate,
	PositionGroup,
	PostBox,
	SEPAPayment,
	SerialNumber,
	TextTemplate,
	WebHook,
};

export const resourceOptions = [
	{ name: 'Attachment', value: 'attachment' },
	{ name: 'Contact', value: 'contact' },
	{ name: 'Customer', value: 'customer' },
	{ name: 'Customer Group', value: 'customerGroup' },
	{ name: 'Discount Position', value: 'discountPosition' },
	{ name: 'Discount Position Group', value: 'discountPositionGroup' },
	{ name: 'Document', value: 'document' },
	{ name: 'Document Payment', value: 'documentPayment' },
	{ name: 'Document Version', value: 'documentVersion' },
	{ name: 'Login', value: 'login' },
	{ name: 'PDF Template', value: 'pdfTemplate' },
	{ name: 'Position', value: 'position' },
	{ name: 'Position Group', value: 'positionGroup' },
	{ name: 'Post Box', value: 'postBox' },
	{ name: 'Project', value: 'project' },
	{ name: 'Raw', value: 'raw' },
	{ name: 'SEPA Payment', value: 'sepaPayment' },
	{ name: 'Serial Number', value: 'serialNumber' },
	{ name: 'Stock', value: 'stock' },
	{ name: 'Task', value: 'task' },
	{ name: 'Text Template', value: 'textTemplate' },
	{ name: 'Time Tracking', value: 'timeTracking' },
	{ name: 'WebHook', value: 'webHook' },
];

// Build a merged list of all operations & fields
export const allResourceProperties = [
	...Customer.description.customerOperations,
	...Customer.description.customerFields,

	...Document.description.documentOperations,
	...Document.description.documentFields,

	...Task.description.taskOperations,
	...Task.description.taskFields,

	...Project.description.projectOperations,
	...Project.description.projectFields,

	...Position.description.positionOperations,
	...Position.description.positionFields,

	...Stock.description.stockOperations,
	...Stock.description.stockFields,

	...Contact.description.contactOperations,
	...Contact.description.contactFields,

	...TimeTracking.description.timeTrackingOperations,
	...TimeTracking.description.timeTrackingFields,

	...Attachment.description.attachmentOperations,
	...Attachment.description.attachmentFields,

	...CustomerGroup.description.customerGroupOperations,
	...CustomerGroup.description.customerGroupFields,

	...DiscountPosition.description.discountPositionOperations,
	...DiscountPosition.description.discountPositionFields,

	...DiscountPositionGroup.description.discountPositionGroupOperations,
	...DiscountPositionGroup.description.discountPositionGroupFields,

	...DocumentPayment.description.documentPaymentOperations,
	...DocumentPayment.description.documentPaymentFields,

	...DocumentVersion.description.documentVersionOperations,
	...DocumentVersion.description.documentVersionFields,

	...Login.description.loginOperations,
	...Login.description.loginFields,

	...PDFTemplate.description.pdfTemplateOperations,
	...PDFTemplate.description.pdfTemplateFields,

	...PositionGroup.description.positionGroupOperations,
	...PositionGroup.description.positionGroupFields,

	...PostBox.description.postBoxOperations,
	...PostBox.description.postBoxFields,

	...SEPAPayment.description.sepaPaymentOperations,
	...SEPAPayment.description.sepaPaymentFields,

	...SerialNumber.description.serialNumberOperations,
	...SerialNumber.description.serialNumberFields,

	...TextTemplate.description.textTemplateOperations,
	...TextTemplate.description.textTemplateFields,

	...WebHook.description.webHookOperations,
	...WebHook.description.webHookFields,

	...Raw.description.rawOperations,
	...Raw.description.rawFields,
];

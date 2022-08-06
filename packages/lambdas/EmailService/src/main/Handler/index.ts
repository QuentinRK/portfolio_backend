import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import AWS from 'aws-sdk';
import { emailFormatter } from '../../../../Utils/Formatter/Formatter';
import { success, failure } from '../../../../Utils/Response/Response';
import validate from '../../../../Utils/Validator/EmailSchema';
import CONFIG from '../../../../../../config/config';
import { Email } from '../../../../Utils/Interfaces/EmailInterface';

const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	switch (event.path) {
		case '/contact':
			const payload = event.body;
			if (payload) {
				if (validate(payload)) {
					const { name, email, message } = payload;
					return sendEmail({ name, email, message });
				} else {
					if (validate.errors) throw Error(String(validate.errors));
				}
			}
		default:
			console.log(event);
			return failure(JSON.stringify({ message: 'Route Not Found' }), 404);
	}
};

const sendEmail = async ({ name, email, message }: Email) => {
	try {
		const ses = new AWS.SES({ region: CONFIG.region });
		await ses.sendEmail(sendEmailParams({ name, email, message })).promise();
		return success(JSON.stringify({ Message: 'Email Sent' }));
	} catch (err) {
		return failure(JSON.stringify({ Message: err }));
	}
};

const sendEmailParams = ({ name, email, message }: Email) => {
	return {
		Destination: {
			ToAddresses: [CONFIG.email_to],
		},
		Message: {
			Body: {
				Text: {
					Charset: 'UTF-8',
					Data: emailFormatter({ name, email, message }),
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: `New Message From ${name}`,
			},
		},
		Source: CONFIG.email_from,
	};
};
export default handler;

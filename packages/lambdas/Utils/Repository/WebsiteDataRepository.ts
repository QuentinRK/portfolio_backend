import { DynamoDB, AWSError } from 'aws-sdk';
import {
	GetItemOutput,
	GetItemInput,
	QueryInput,
	QueryOutput,
} from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import CONFIG from '../../../../config/config';
import { TableNames } from 'backenddb/TableNames';

export default class {
	private dyanmodb: DynamoDB;

	constructor() {
		this.dyanmodb = new DynamoDB({
			region: CONFIG.region,
		});
	}

	getProjectsData = async (): Promise<PromiseResult<QueryOutput, AWSError>> => {
		const params: QueryInput = {
			TableName: TableNames.WebsiteData,
			KeyConditionExpression: '#dba90 = :dba90',
			ExpressionAttributeNames: { '#dba90': 'recordType' },
			ExpressionAttributeValues: { ':dba90': { S: 'project' } },
		};
		return this.dyanmodb
			.query(params)
			.promise()
			.catch((err) => {
				console.log(`Query Failed: ${err}`);
				return err;
			});
	};

	getBioData = async (): Promise<PromiseResult<GetItemOutput, AWSError>> => {
		const params: GetItemInput = {
			TableName: TableNames.WebsiteData,
			Key: {
				recordType: { S: 'biography' },
				name: { S: 'bio' },
			},
		};

		return this.dyanmodb
			.getItem(params)
			.promise()
			.catch((err) => {
				console.log(`GetItem Failed: ${err}`);
				return err;
			});
	};
}

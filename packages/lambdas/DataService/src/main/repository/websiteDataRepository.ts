import { DynamoDB, Endpoint, AWSError } from "aws-sdk";
import {
  GetItemOutput,
  GetItemInput,
  QueryInput,
  QueryOutput,
} from "aws-sdk/clients/dynamodb";
import { PromiseResult } from "aws-sdk/lib/request";
import { TableNames } from "../../../../../backenddb/TableNames";

export class websiteDataRepository {
  private dyanmodb: DynamoDB;

  constructor() {
    this.dyanmodb = new DynamoDB({
      endpoint: new Endpoint("http://localhost:8000"),
    });
  }

  getProjectsData = async (): Promise<PromiseResult<QueryOutput, AWSError>> => {
    const params: QueryInput = {
      TableName: TableNames.WebsiteData,
      KeyConditionExpression: "#dba90 = :dba90",
      ExpressionAttributeNames: { "#dba90": "recordType" },
      ExpressionAttributeValues: { ":dba90": { S: "project" } },
    };
    return await this.dyanmodb
      .query(params)
      .promise()
      .catch((err) => err);
  };

  getBioData = async (): Promise<PromiseResult<GetItemOutput, AWSError>> => {
    const params: GetItemInput = {
      TableName: TableNames.WebsiteData,
      Key: {
        recordType: { S: "biography" },
        name: { S: "bio" },
      },
    };

    return await this.dyanmodb
      .getItem(params)
      .promise()
      .catch((err) => err);
  };
}

import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { PromiseResult } from "aws-sdk/lib/request";
import { websiteDataRepository } from "../repository/websiteDataRepository";
import { failure, success } from "../response/response";
import { GetItemOutput, QueryOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk";
import { FormatResponse, formatter } from "../formatter/formatter";


export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const websiteData = new websiteDataRepository();
  let payload: PromiseResult<QueryOutput|GetItemOutput, AWSError>;
  let formattedResponse: FormatResponse|FormatResponse[];

  switch (event.path) {
    case "/bio":
      payload = await websiteData.getBioData();
      console.log(payload);
      formattedResponse = formatter(payload);
      return success(JSON.stringify(formattedResponse));
    case "/projects":
      payload = await websiteData.getProjectsData();
      formattedResponse = formatter(payload);
      console.log(formattedResponse)      

      return success(JSON.stringify(formattedResponse));
    default:
      return failure(JSON.stringify({ message: "not found" }), 404);
  }
};

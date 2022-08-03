import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';
import { GetItemOutput, QueryOutput } from 'aws-sdk/clients/dynamodb';
import { failure, success } from '../Response/Response';
import WebsiteDataRepository from '../Repository/WebsiteDataRepository';
import formatter from '../Formatter/Formatter';
import { FormatResponse } from '../Interfaces/FormatterInterface';

const main = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const websiteData = new WebsiteDataRepository();
  let payload: PromiseResult<QueryOutput | GetItemOutput, AWSError>;
  let formattedResponse: FormatResponse | FormatResponse[] | Error;

  switch (event.path) {
    case '/bio':
      payload = await websiteData.getBioData();
      formattedResponse = formatter(payload);
      return success(JSON.stringify(formattedResponse));
    case '/projects':
      payload = await websiteData.getProjectsData();
      formattedResponse = formatter(payload);
      return success(JSON.stringify(formattedResponse));
    default:
      return failure(JSON.stringify({ message: 'Route Not Found' }), 404);
  }
};

export default main;

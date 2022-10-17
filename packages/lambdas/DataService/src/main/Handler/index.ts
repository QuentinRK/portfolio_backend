import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';
import { GetItemOutput, QueryOutput } from 'aws-sdk/clients/dynamodb';
import { failure, success } from '../../../../Utils/Response/Response';
import WebsiteDataRepository from '../../../../Utils/Repository/WebsiteDataRepository';
import formatter from '../../../../Utils/Formatter/Formatter';
import { FormatResponse } from '../../../../Utils/Interfaces/FormatterInterface';

const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const websiteData = new WebsiteDataRepository();
  let payload: PromiseResult<QueryOutput | GetItemOutput, AWSError>;
  let formattedResponse: FormatResponse | FormatResponse[] | Error;

  switch (event.path) {
    case '/about-me':
      payload = await websiteData.getBioData();
      formattedResponse = formatter(payload, 'bio');
      return success(JSON.stringify(formattedResponse));
    case '/projects':
      payload = await websiteData.getProjectsData();
      formattedResponse = formatter(payload, 'projects');
      return success(JSON.stringify(formattedResponse));
    case '/work':
      payload = await websiteData.getWorkData();
      formattedResponse = formatter(payload, 'work');
      return success(JSON.stringify(formattedResponse));
    default:
      return failure(JSON.stringify({ message: 'Route Not Found' }), 404);
  }
};

export default handler;

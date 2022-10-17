/* eslint-disable no-undef */
import * as AWS from 'aws-sdk-mock';
import { APIGatewayProxyEvent } from 'aws-lambda';
import lambdaHandler from '../../main/Handler/index';
import projects from '../mocks/projects.json';
import bio from '../mocks/bio.json';
import workHistory from '../mocks/workHistory.json';

describe('Tests how lambda handler executes different routes', () => {
  it('verifies /about-me endpoint data', async () => {
    AWS.mock('DynamoDB', 'getItem', bio);
    const event: APIGatewayProxyEvent = {
      path: '/about-me',
    } as any;
    const result = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toMatchSnapshot();
  });

  it('verifies /work endpoint data', async () => {
    AWS.mock('DynamoDB', 'query', workHistory);

    const event: APIGatewayProxyEvent = {
      path: '/work',
    } as any;
    const result = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toMatchSnapshot();
  });

  it('verifies /projects endpoint data', async () => {
    AWS.remock('DynamoDB', 'query', projects);
    const event: APIGatewayProxyEvent = {
      path: '/projects',
    } as any;
    const result = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toMatchSnapshot();
  });

  it('Should throw not found error', async () => {
    const event: APIGatewayProxyEvent = {
      path: '/invalid-route',
    } as any;
    const result = await lambdaHandler(event);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual('{"message":"Route Not Found"}');
  });

  afterAll(() => {
    AWS.restore('DynamoDB');
  });
});

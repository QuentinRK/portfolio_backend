/* eslint-disable no-undef */
import * as AWS from 'aws-sdk-mock';
import { APIGatewayProxyEvent } from 'aws-lambda';
import lambdaHandler from '../../main/Handler/index';
import projects from '../mocks/projects.json';
import bio from '../mocks/bio.json';

describe('Tests how lambda handler executes different routes', () => {
  beforeAll(() => {
    AWS.mock('DynamoDB', 'getItem', bio);
    AWS.mock('DynamoDB', 'query', projects);
  });

  it('verifies /bio endpoint data', async () => {
    const event: APIGatewayProxyEvent = {
      path: '/bio',
    } as any;
    const result = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toMatchSnapshot();
  });

  it('verifies /projects endpoint data', async () => {
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

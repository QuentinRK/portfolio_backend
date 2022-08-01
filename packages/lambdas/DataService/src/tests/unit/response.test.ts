/* eslint-disable no-undef */
import { APIGatewayProxyResult } from 'aws-lambda';
import { success, failure } from '../../main/Response/response';
import corsHeaders from '../../main/Response/corsHeaders';

describe('Tests Success Response', () => {
  it('Tests formatter for projects', async () => {
    const payload: APIGatewayProxyResult = success(JSON.stringify('Test Is Successful'));

    expect(payload.statusCode).toEqual(200);
    expect(payload.headers).toEqual(corsHeaders);
    expect(JSON.parse(payload.body)).toEqual('Test Is Successful');
  });

  it('Tests Failure Response', async () => {
    const payload: APIGatewayProxyResult = failure(JSON.stringify('Test Has Failed'));

    expect(payload.statusCode).toEqual(500);
    expect(payload.headers).toEqual(corsHeaders);
    expect(JSON.parse(payload.body)).toEqual('Test Has Failed');
  });
});

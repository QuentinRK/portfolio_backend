import { APIGatewayProxyResult } from 'aws-lambda';
import corsHeaders from './corsHeaders';

export const success = (body: string): APIGatewayProxyResult => ({
  statusCode: 200,
  headers: corsHeaders,
  body,
});

export const failure = (
  body: string,
  statusCode: number = 500,
): APIGatewayProxyResult => ({
  statusCode,
  headers: corsHeaders,
  body,
});

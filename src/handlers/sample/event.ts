import { Response } from 'express';
import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  Context
} from 'aws-lambda';
import { Logger } from '@/utils';

const logger = new Logger('Sample');

/**
 * This function is intended to handle AWS Lambda requests with event and context objects.
 * It uses the Express Response object to send back the response to the client.
 * Note: AWS Lambda wraps the incoming event and context into the 'req' object before passing it to this function.
 * You should use "awsServerlessExpressMiddleware" to adapt the Express app to AWS Lambda.
 * @param req - The request object, which contains the event and context from AWS Lambda.
 * @param res - The Express Response object used to send the response back to the client.
 * @returns A Promise that resolves to the response sent back to the client.
 */

export async function sampleEventHandler(
  req: any,
  res: Response
): Promise<Response> {
  // Extract the event and event objects from the 'req.apiGateway' property.
  // 'req.apiGateway' is where AWS Lambda wraps the original event and event objects.
  const event = req.apiGateway.event as APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>;
  const context = req.apiGateway.context as Context;

  console.log(event, context);

  logger.info('Welcome to Lambda event handler')
  return res.send('Welcome to Lambda event & context handler!');
}
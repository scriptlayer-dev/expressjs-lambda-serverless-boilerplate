import { Logger } from '@/utils';
import { Context } from 'aws-lambda';

const logger = new Logger('Lambda')

/**
 * An async function that serves as a simple handler for the Lambda function.
 * It returns a 200 OK response with a JSON body containing the incoming event object.
 *
 * @function handler
 * @param {any} event - The event object representing the input to the Lambda function.
 * @param {Context} _context - The context object (unused in this function).
 * @returns {Promise<{ statusCode: number; body: string }>} A Promise that resolves to an object containing a statusCode of 200 and a JSON stringified body with the input event object.
 */
export const handler = (event: any, _context: Context) => {
  logger.info(`invoked lambda with payload: ${JSON.stringify(event)}`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      event,
    }),
  };
};

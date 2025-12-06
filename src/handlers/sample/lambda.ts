import { InternalServerError } from '@/errors';
import { Logger } from '@/utils';
import { Request, Response, NextFunction } from '@/types';
import { lambda } from '@/services';

const logger = new Logger('Lambda');

/**
 * Handles the process of invoking another Lambda function using an HTTP request.
 * @param req - Express request object (unused in this function).
 * @param res - Express response object to send a response back to the client.
 * @param next - Express NextFunction, used to pass control to the next middleware or route handler in the chain.
 * @returns {Promise<Response>} A Promise that resolves to an Express response object.
 */
export async function sampleLambdaHandler(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    logger.info(`Lambda handler example`);

    // Invoke another Lambda function using the 'lambda.invoke' method.
    lambda.invoke(
      {
        FunctionName: `${process.env.LAMBDA_FUNCTION_PREFIX}-lambda`,
        InvocationType: 'Event',
        Payload: JSON.stringify({ message: 'lambda handler sample' }),
      },
      (err, _res) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(
            `Successfully invoked lambda function "lambda" with payload`,
          );
        }
      }
    );

    return res.send('Welcome to Lambda!')
  } catch (e: any) {
    logger.error(e.message);
    next(new InternalServerError(e.message));
  }
}

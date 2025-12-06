import { InternalServerError } from '@/errors';
import { Logger } from '@/utils';
import { Request, Response, NextFunction } from '@/types';

const logger = new Logger('Sample');

/**
 * Handles the login process for users.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<Response>} - Express response object
 */
export async function sampleHandler(
  _: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    logger.info(`Welcome`);
    return res.send('Welcome!')
  } catch (e: any) {
    logger.error(e.message);
    next(new InternalServerError(e.message));
  }
}

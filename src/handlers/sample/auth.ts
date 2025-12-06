import {
  AuthenticatedRequest,
  Response,
  NextFunction,
} from '@/types';
import { InternalServerError } from '@/errors';
import { getUserIdFromRequest } from '@/services';
import { Logger } from '@/utils';

const logger = new Logger('getUser');

/**
 * This function is a sample authentication handler for Express routes.
 * It expects an 'AuthenticatedRequest', 'Response', and 'NextFunction' as parameters.
 * @param req - The 'AuthenticatedRequest' object, which is an extended version of Express' 'Request'.
 *             It contains additional properties related to authentication, like the user's identity or authentication tokens.
 * @param res - The 'Response' object used to send a JSON response back to the client.
 * @param next - The 'NextFunction', which is used to pass control to the next middleware or route handler in the chain.
 * @returns A Promise that resolves to a JSON response containing the 'user_id'.
 */
export async function sampleAuthHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const id = getUserIdFromRequest(req);
    logger.info(id);

    return res.json({ user_id: id });
  } catch (e: any) {
    logger.error(e);
    next(new InternalServerError(e.message));
  }
}

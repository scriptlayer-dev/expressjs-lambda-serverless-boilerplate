import {
  AuthenticatedRequest,
  Request,
  Response,
  NextFunction,
  JWTUser,
} from '@/types';
import { Logger } from '@/utils';
import { extractTokenFromHeaders, verifyToken } from '@/services';

const logger = new Logger('requireAuthentication');

/**
 * Middleware that checks for a JWT token in the 'x-auth-token' or 'Authorization' header,
 * verifies it, and sets the decoded user object on the request if successful.
 * If verification fails or there is no token, a 401 Unauthorized response is sent.
 * @function requireAuthentication
 * @param {Request} req - The express request object with an optional user property.
 * @param {Response} res - The express response object.
 * @param {NextFunction} next - The express next function.
 * @returns {void} This function does not return anything. It either calls next() or sends a response.
 */
export const requireAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  let user: JWTUser | undefined;
  try {
    // There is a dev edgecase where a token can be valid but the id
    // that is returned fails because the dev deleted the user from the db.
    const token = extractTokenFromHeaders(req);
    logger.info(`Authenticating`);
    user = verifyToken(token);
  } catch (e: any) {
    return next(e);
  }

  (req as AuthenticatedRequest).user = user;
  next();
};
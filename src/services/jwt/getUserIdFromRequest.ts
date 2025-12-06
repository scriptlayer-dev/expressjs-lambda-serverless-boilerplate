import { AuthenticatedRequest } from '@/types';
import { AuthorizationError } from '@/errors';
import { Logger, prettyJSON } from '@/utils';

const logger = new Logger('getUserIdFromRequest');

/**
 * Retrieves the user id from the request. This is defensive, any handlers that use this
 * are downstream from requireAuthentication.
 *
 * @param req Express Request
 * @returns The user id
 * @throws AuthorizationError if user data is not present in the request
 */
export function getUserIdFromRequest(req: AuthenticatedRequest): string {
  logger.info(prettyJSON(req.user));
  const { user } = req;
  if (!user) {
    throw new AuthorizationError();
  }

  return user.id;
}

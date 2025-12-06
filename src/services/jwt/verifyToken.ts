import jwt from 'jsonwebtoken';
import type { JWTUser } from '@/types';
import { Logger, prettyJSON } from '@/utils';
import { AuthenticationError } from '@/errors';

const logger = new Logger('verifyToken');

/**
 * This function verifies a JWT token and decodes the User object from it.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {SafeUser} - The decoded User object from the token.
 *
 * @throws {AuthenticationError} - If the token verification fails (i.e., if the token is invalid, expired, or not signed with the correct secret key).
 *
 * @example
 * const user = verifyToken(token);
 */
export const verifyToken = (token: string): JWTUser => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    logger.info(`Authenticated user ${prettyJSON(decoded)}`);
    return decoded as JWTUser;
  } catch (error) {
    logger.error(`Error verifying a user token. error=${error}`);
    throw new AuthenticationError();
  }
};
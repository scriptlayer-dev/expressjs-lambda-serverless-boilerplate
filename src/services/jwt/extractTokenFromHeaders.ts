import { Request } from 'express';
import { Logger } from '@/utils';
import { AuthenticationError } from '@/errors';

const logger = new Logger('extractTokenFromHeaders');

/**
 * This function extracts the JWT token from the request headers.
 * It looks for the token in the 'x-auth-token' and 'Authorization' headers.
 *
 * @param {Request} req - Express.js request object.
 * @returns {string} - The extracted JWT token.
 *
 * @throws {AuthenticationError} - If no token is found in the headers or the token format is not valid.
 *
 * @example
 * const token = extractTokenFromHeaders(req);
 */
export const extractTokenFromHeaders = (req: Request): string => {
  let token = req.header('x-auth-token') || req.header('Authorization');

  if (!token) {
    logger.error('Token header missing from request.');
    throw new AuthenticationError();
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice('Bearer '.length);
  }

  return token;
};
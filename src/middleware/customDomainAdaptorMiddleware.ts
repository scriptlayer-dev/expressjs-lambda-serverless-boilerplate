import { RequestHandler } from 'express';

/**
 * customDomainAdaptorMiddleware is a middleware function that modifies the incoming request's URL
 * based on the presence of a specific header 'x-amzn-trace-id'.
 * @param {Request} req - The express request object with an optional user property.
 * @param {Response} res - The express response object.
 * @param {NextFunction} next - The express next function.
 * @returns {void} This function does not return anything. It either calls next() or sends a response.
 */

export const customDomainAdaptorMiddleware: RequestHandler = (req, _res, next) => {
  if (!!req.headers['x-amzn-trace-id']) {

    // Extract the actual service route by splitting the URL and removing the first two elements.
    // The first element is an empty string (before the first slash), and the second element is the service-specific part.
    // Then, join the remaining elements back to form the modified URL.
    req.url = '/' + req.url.split('/').slice(2).join('/');
  }
  next();
};
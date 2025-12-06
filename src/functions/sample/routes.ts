import express from 'express';

import { sampleHandler, sampleEventHandler, sampleAuthHandler, sampleLambdaHandler } from '@/handlers';
import { requireAuthentication } from '@/middleware';

const router = express.Router();

/**
 * Route: GET '/'
 * This route is for a regular Express request and response handler.
 * It will execute the 'sampleHandler' function when a GET request is made to the root path ('/') of the server.
 */
router.get('/', sampleHandler);

/** 
 * Route: GET '/event'
 * This route is for a Lambda event and context handler.
 * It will execute the 'sampleEventHandler' function when a GET request is made to the '/event' path of the server.
 * Note: The 'sampleEventHandler' function expects to receive AWS Lambda event and context objects.
 * This route may be used when deploying the Express app in AWS Lambda.
 */
router.get('/event', sampleEventHandler);

/**
 * Route: GET '/auth'
 * This route is for handling authenticated requests using a middleware called 'requireAuthentication'.
 * The 'requireAuthentication' middleware will be executed before 'sampleAuthHandler' to check if the request is authenticated.
 * If the request is authenticated, it will proceed to execute 'sampleAuthHandler'; otherwise, it will stop and return an unauthorized response.
 */
router.get('/auth', requireAuthentication, sampleAuthHandler)

/**
 * Route: GET '/lambda'
 * This route is used to invoke a Lambda function.
 * The 'sampleLambdaHandler' function is executed when a GET request is made to the '/lambda' path of the server.
 * Note: The 'sampleLambdaHandler' function is expected to handle the logic to invoke the desired Lambda function.
 */
router.get('/lambda', sampleLambdaHandler)

export default router;

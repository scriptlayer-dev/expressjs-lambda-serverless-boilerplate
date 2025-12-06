import express from 'express';

import { webhook } from '@/handlers';

import bodyParser from 'body-parser';

export const app = express();

/**
 * Route: POST '/webhook'
 * This route is used to handle incoming Stripe webhook events.
 * The route utilizes the 'body-parser' middleware to parse the incoming request's raw JSON body.
 * The 'body-parser.raw' middleware is used with the specified type 'application/json'
 * to parse the incoming request body as raw JSON data.
 * Stripe webhooks require raw JSON data for signature validation, hence the use of 'body-parser.raw' here.
 * After parsing, the 'webhook' handler function is executed to process the webhook event.
 */
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhook);

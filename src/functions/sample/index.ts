import sls from 'serverless-http';
import app from '@/lib/app';

import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import routes from './routes';

/**
 * Use the 'aws-serverless-express' middleware to bridge the gap between Express and AWS Lambda,
 * allowing access to the AWS Lambda context when handling requests.
 * This middleware makes the 'req.apiGateway' and 'req.apiGateway.context' properties available in each request.
 * 'req.apiGateway' contains the original AWS API Gateway event and context provided by AWS Lambda.
 * 'req.apiGateway.context' provides access to the AWS Lambda context.
 */
app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/sample', routes);

export const handler = sls(app);

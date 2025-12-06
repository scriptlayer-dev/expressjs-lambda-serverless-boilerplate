import AWS, { Lambda } from 'aws-sdk';

// Define the configuration for the AWS Lambda client based on environment variables.
let lambdaConfig: Lambda.Types.ClientConfiguration = {
  region: process.env.REGION,
  accessKeyId: process.env.AWS_SECRET_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY, 
};

// If the API_STAGE environment variable is set to 'local', configure the Lambda client to use a local endpoint.
// This allows the Lambda client to interact with a locally running AWS Lambda service.
if (process.env.API_STAGE === 'local')
  lambdaConfig.endpoint = `http://0.0.0.0:${process.env.LAMBDA_PORT}`;

export const lambda = new AWS.Lambda(lambdaConfig);

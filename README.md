# ExpressJS Lambda Serverless Boilerplate

A boilerplate project for building Express.js applications using Express, AWS Lambda, and Serverless framework. It provides a foundation to quickly set up a serverless architecture with sample endpoints, making it easier to get started with serverless development.

## Features

- Express.js for handling HTTP requests and routing.
- AWS Lambda for serverless computing.
- Serverless Framework for deploying and managing AWS Lambda functions.
- Sample endpoints with authentication middleware for quick testing and understanding.
- Environment variable support for different stages (local, test, dev, stage, prod).

## Sample Routes

### Route: `GET /healthz`

This route is a health check endpoint for the application. It can be used to verify if the application is running and healthy. When a GET request is made to this path, the server will respond with a status code of 200 OK, indicating that the application is healthy.

### Route: `GET /sample`

This route is a regular Express request and response handler. It can be used for testing basic endpoint functionality. When a GET request is made to this path, the 'sampleHandler' function will be executed.

### Route: `GET /sample/event`

This route is intended to handle AWS Lambda requests with event and context objects. It will execute the 'sampleEventHandler' function when a GET request is made to this path. Note that the 'sampleEventHandler' function expects to receive AWS Lambda event and context objects.

### Route: `GET /sample/auth`

This route is for handling authenticated requests using the 'requireAuthentication' middleware. The 'requireAuthentication' middleware will be executed before 'sampleAuthHandler' to check if the request is authenticated. If the request is authenticated, it will proceed to execute 'sampleAuthHandler'; otherwise, it will stop and return an unauthorized response.

### Route: `GET /sample/lambda`

This route is used to invoke a Lambda function. The 'sampleLambdaHandler' function is executed when a GET request is made to the '/lambda' path of the server. Note: The 'sampleLambdaHandler' function is expected to handle the logic to invoke the desired Lambda function.

### Route: `POST /webhook`

This route is used to handle Stripe webhooks. It expects incoming POST requests with raw JSON data, which is required for signature validation. When a Stripe webhook event is received at this path, the 'webhook' handler function will be executed to process the webhook event.

## How to Run Locally

1. Clone the repository:

```
git clone https://github.com/jdawkinsdew/expressjs-lambda-serverless-boilerplate.git
cd expressjs-lambda-serverless-boilerplate
```

2. Install dependencies:

```
npm install
```

3. Set up environment:

```
cp .env.example .env
```

Update the `.env` file with your API keys or other environment variables as needed.

4. Start the server locally:

```
npm run dev
```

The server will be running on http://localhost:4000. You can access the sample routes locally using this address.

## How to Deploy

This project uses the Serverless Framework for deploying the AWS Lambda functions. Ensure you have the AWS credentials set up on your local environment to deploy the Lambda functions.

1. Deploy to a specific stage (e.g., test, dev, stage, prod):

```
npm run deploy:<stage>
```

Replace `<stage>` with the desired stage name, for example:

```
npm run deploy:dev
```

This will deploy the Lambda functions to the specified stage in your AWS account.

## Issues

If you find any issues or have any suggestions for improvements, please [open an issue](https://github.com/jdawkinsdew/expressjs-lambda-serverless-boilerplate/issues). We welcome contributions from the community!

## Authors

- [Gitpiece](https://github.com/jdawkinsdew)

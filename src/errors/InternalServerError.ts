export class InternalServerError extends Error {
  statusCode = 500;
  constructor(message = 'Internal server error.') {
    super(message);
    this.name = 'InternalServerError';
  }
}
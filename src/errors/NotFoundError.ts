export class NotFoundError extends Error {
  statusCode = 404;
  constructor(resource = 'Resource') {
    super(`The requested ${resource} could not be found.`);
    this.name = 'NotFoundError';
  }
}

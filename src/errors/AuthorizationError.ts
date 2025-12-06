export class AuthorizationError extends Error {
  statusCode = 403;
  constructor(message = 'You do not have permission to access this resource.') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

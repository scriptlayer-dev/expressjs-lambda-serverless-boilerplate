export class AuthenticationError extends Error {
  statusCode = 401;
  constructor(message = 'Invalid credentials.') {
    super(message);
    this.name = 'AuthenticationError';
  }
}
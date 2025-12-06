import { JWTUser } from './src/types';

// Typescript REALLY doesn't like changes to the request object
// So this tells typescript all Requests have the user object,
// even though only requests after requireAuthentication do

declare global {
  namespace Express {
    interface Request {
      user: JWTUser;
    }
  }
}

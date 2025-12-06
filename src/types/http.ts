export type { Request, Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';
import type { JWTUser } from '@/types';

export interface AuthenticatedRequest<
  P = ExpressRequest['params'],
  ResBody = any,
  ReqBody = any,
  ReqQuery = ExpressRequest['query']
> extends ExpressRequest<P, ResBody, ReqBody, ReqQuery> {
  user: JWTUser;
}
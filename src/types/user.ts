export type JWTUser = {
  id: string;
  email: string;
  is_admin: boolean;
  verified: boolean;
  iat?: number;
  exp?: number;
};
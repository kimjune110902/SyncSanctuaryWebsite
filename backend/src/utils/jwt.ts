import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

// Reads from environment variables
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || '';
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || '';

export interface TokenPayload {
  sub: string;
  username: string;
  role: string;
  client_type: string;
}

export function generateAccessToken(payload: TokenPayload, jti?: string): string {
  if (!PRIVATE_KEY) throw new Error("JWT_PRIVATE_KEY is not set");

  const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '15m', // 15 minutes
  };

  if (jti) {
    signOptions.jwtid = jti;
  }

  return jwt.sign(payload, PRIVATE_KEY, signOptions);
}

export function verifyAccessToken(token: string): TokenPayload {
  if (!PUBLIC_KEY) throw new Error("JWT_PUBLIC_KEY is not set");

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return jwt.verify(token, PUBLIC_KEY, verifyOptions) as TokenPayload;
}

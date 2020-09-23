import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth-config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Authentication token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret, {
      algorithms: ['HS256'],
    }) as TokenPayload;

    request.user = {
      id: decodedToken.sub,
    };

    return next();
  } catch (err) {
    throw new Error(
      'Invalid authentication token, please log in a new session',
    );
  }
};

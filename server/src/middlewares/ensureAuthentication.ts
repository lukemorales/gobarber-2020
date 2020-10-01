import { verify } from 'jsonwebtoken';
import { ExpressMiddleware } from '../@types/middleware';
import authConfig from '../config/auth-config';
import AppException from '../exceptions/AppException';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthentication: ExpressMiddleware = (request, _, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppException(request.t('missing_auth_token'), 401);
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
    throw new AppException(request.t('invalid_token'), 401);
  }
};

export default ensureAuthentication;

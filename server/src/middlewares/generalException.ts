import { ExpressErrorMiddleware } from '../@types/middleware';
import AppError from '../exceptions/AppError';

const generalException: ExpressErrorMiddleware = (
  err,
  request,
  response,
  _,
) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // eslint-disable-line no-console

  return response.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
};

export default generalException;

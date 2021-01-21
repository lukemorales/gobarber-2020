import { StatusCodes } from 'http-status-codes';
import { ExpressErrorMiddleware } from '../../../../@types/middleware';
import AppException from '../../../exceptions/AppException';

const generalException: ExpressErrorMiddleware = (
  err,
  request,
  response,
  _,
) => {
  if (err instanceof AppException) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err); // eslint-disable-line no-console

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: request.t('internal_server_error'),
  });
};

export default generalException;

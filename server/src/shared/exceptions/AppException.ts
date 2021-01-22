/* eslint-disable import/no-duplicates */
import { StatusCodes } from 'http-status-codes';

import { HttpKeys } from '~/@types/http-status-codes';

class AppException {
  constructor(
    public readonly message: string,
    public readonly status: HttpKeys = StatusCodes.BAD_REQUEST,
  ) {}
}

export default AppException;

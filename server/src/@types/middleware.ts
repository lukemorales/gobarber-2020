export type ExpressMiddleware = (
  request: import('express').Request,
  response: import('express').Response,
  next: import('express').NextFunction,
) => Promise<void> | void;

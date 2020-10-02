export type ExpressMiddleware = (
  request: import('express').Request,
  response: import('express').Response,
  next: import('express').NextFunction,
) => Promise<void> | void;

export type ExpressErrorMiddleware = (
  error: Error,
  request: import('express').Request,
  response: import('express').Response,
  next: import('express').NextFunction,
) => import('express').Response;

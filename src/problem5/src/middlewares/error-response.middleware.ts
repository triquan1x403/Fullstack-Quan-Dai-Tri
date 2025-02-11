/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { ErrorPayloadType } from '../commons';

type MessageType = { field: (string | number)[]; error: string };

export const errorResponseMiddleware: ErrorRequestHandler = (
  payload: ErrorPayloadType,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string | MessageType | MessageType[] | string[] = 'An unexpected error occurred!';

  if (payload instanceof ZodError) {
    status = StatusCodes.BAD_REQUEST;

    if (payload.issues.length === 1) {
      message = `${payload.issues[0]?.message as string}!`;
    } else {
      message = payload.issues.map((issue) => `${issue.message}!`);
    }
  } else if (payload instanceof JsonWebTokenError) {
    status = StatusCodes.UNAUTHORIZED;
    message =
      payload instanceof TokenExpiredError
        ? 'Sign in session expired!'
        : 'Invalid sign in session!';
  } else if (payload instanceof HttpError) {
    status = payload.status;
    message = payload.message;
  }

  res
    .status(status)
    .json({
      name: getReasonPhrase(status),
      code: status,
      message: `${message}`,
    })
    .flush();
};

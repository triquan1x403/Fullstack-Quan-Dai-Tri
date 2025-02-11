/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { PayloadType } from '../commons';

type SuccessRequestHandler = ErrorRequestHandler;

const isPromise = (value: any): value is Promise<boolean> => {
  return value instanceof Promise || (value && typeof value.then === 'function');
};

export const successResponseMiddleware: SuccessRequestHandler = async (
  payload: PayloadType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (payload instanceof Error) {
    return next(isPromise(payload) ? await payload : payload);
  } else {
    const data = isPromise(payload.data) ? await payload.data : payload.data;
    const { message = 'Successfully!', status = StatusCodes.OK, metadata } = payload;

    const response = { name: getReasonPhrase(status), code: status, message, data };

    if (metadata) {
      Object.assign(response, { metadata });
    }

    res.status(status).json(response).flush();
  }
};

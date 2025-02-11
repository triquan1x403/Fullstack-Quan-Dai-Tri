import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { JwtResponseType, JwtSignatureEnum } from '../commons';
import { jwtHandler } from '../utilities';

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(createHttpError(StatusCodes.UNAUTHORIZED, 'Not found sign in session!'));
  }
  const token = (
    authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization
  ) as string;

  try {
    const result = (await jwtHandler.certify(token, JwtSignatureEnum.ACCESS)) as JwtResponseType;
    req['user'] = result;
    return next();
  } catch (error) {
    return next(error);
  }
};

import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { PaginationMetadataType } from './pagination-metadata.type';

export type SuccessPayloadType<T = object> = {
  data: T | T[] | Promise<T | T[]> | null;
  message: string;
  status: StatusCodes;
  metadata?: PaginationMetadataType;
};

export type ErrorPayloadType = Error | JsonWebTokenError | ZodError;

export type PayloadType = SuccessPayloadType | ErrorPayloadType;

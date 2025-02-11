import { StatusCodes } from 'http-status-codes';

import {
  PaginationMetadataInterfaceType,
  PaginationMetadataType,
  SuccessPayloadType,
} from '../commons';

export const createHttpPaginate = <T extends object | object[]>(
  data: T | T[],
  metadata: PaginationMetadataInterfaceType,
  message: string = 'Successfully!',
  status: StatusCodes = StatusCodes.OK,
): SuccessPayloadType => {
  const response: SuccessPayloadType = { status, message, data };

  const { take, page } = metadata.options;
  const meta: PaginationMetadataType = {
    take,
    page,
    itemCount: metadata.count,
    pageCount: Math.ceil(metadata.count / take),
    hasPreviousPage: page > 1,
    hasNextPage: page < metadata.count,
    beginRange: (page - 1) * take + 1,
    endRange: Math.min(page * take, metadata.count),
  };
  response.metadata = meta;

  return response;
};

export const createHttpItem = <T extends object | object[]>(
  data: T | T[] | null,
  message: string = 'Successfully!',
  status: StatusCodes = StatusCodes.OK,
): SuccessPayloadType => {
  const response: SuccessPayloadType = { status, message, data };
  return response;
};

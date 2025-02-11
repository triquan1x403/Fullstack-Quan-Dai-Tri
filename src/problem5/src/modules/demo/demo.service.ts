import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { PaginationQuerySchema } from '../../commons';
import { createHttpItem, createHttpPaginate, paginationHandler } from '../../utilities';
import { DemoType } from './types/demo.type';

class DemoService {
  getPagination(params: PaginationQuerySchema) {
    const { take, page } = paginationHandler(params.take, params.page);
    return createHttpPaginate<{ message: string }>(
      [{ message: 'Hi World' }, { message: 'Hello World' }],
      {
        count: 2,
        options: { take, page },
      },
    );
  }

  getSuccess() {
    return createHttpItem({ message: 'Hello World' });
  }

  getError() {
    return createHttpError(StatusCodes.BAD_REQUEST, 'Failure get error message!');
  }

  postValidator(email: string) {
    return createHttpItem<DemoType>({ email });
  }
}

export default new DemoService();

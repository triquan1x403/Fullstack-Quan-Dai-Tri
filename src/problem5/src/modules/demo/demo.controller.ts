import { NextFunction, Request, Response } from 'express';

import { PaginationQuerySchema } from '../../commons';
import { SendMailTemplateEvent } from '../mail';
import DemoService from './demo.service';
import { DemoBodySchema } from './validators';

class DemoController {
  getPagination(
    req: Request<unknown, unknown, unknown, PaginationQuerySchema>,
    res: Response,
    next: NextFunction,
  ) {
    const result = DemoService.getPagination({ ...req.query });
    return next(result);
  }

  getSuccess(req: Request, res: Response, next: NextFunction) {
    const result = DemoService.getSuccess();
    return next(result);
  }

  getError(req: Request, res: Response, next: NextFunction) {
    const result = DemoService.getError();
    return next(result);
  }

  postValidator(req: Request<unknown, unknown, DemoBodySchema>, res: Response, next: NextFunction) {
    const { email } = req.body;
    const result = DemoService.postValidator(email);
    SendMailTemplateEvent.emit('sendMailTemplate', email);
    return next(result);
  }
}

export default new DemoController();

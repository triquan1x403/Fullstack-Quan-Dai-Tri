import { Router } from 'express';

import { paginationValidator } from '../../commons/validators/pagination.validator';
import { validateRequestMiddleware } from '../../middlewares';
import DemoController from './demo.controller';
import { demoValidator } from './validators';

export const demoRoutes = Router();

demoRoutes.get(
  '/pagination',
  validateRequestMiddleware(paginationValidator),
  DemoController.getPagination,
);

demoRoutes.get('/success', DemoController.getSuccess);

demoRoutes.get('/error', DemoController.getError);

demoRoutes.post(
  '/validator',
  validateRequestMiddleware(demoValidator),
  DemoController.postValidator,
);

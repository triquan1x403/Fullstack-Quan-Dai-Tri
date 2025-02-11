import { Router } from 'express';

import { paginationValidator } from '../../commons';
import { validateRequestMiddleware } from '../../middlewares';
import ResourcesController from './resources.controller';
import { createResourceValidator, updateResourceValidator } from './validators';
import { getResourceDetailValidator } from './validators/get-resource.validator';

export const resourcesRoutes = Router();

resourcesRoutes.post(
  '/',
  validateRequestMiddleware(createResourceValidator),
  ResourcesController.createResource,
);

resourcesRoutes.get(
  '/',
  validateRequestMiddleware(paginationValidator),
  ResourcesController.getListResource,
);

resourcesRoutes.get(
  '/:id',
  validateRequestMiddleware(getResourceDetailValidator),
  ResourcesController.getDetailResource,
);

resourcesRoutes.patch(
  '/:id',
  validateRequestMiddleware(updateResourceValidator),
  ResourcesController.updateResource,
);

resourcesRoutes.delete(
  '/:id',
  validateRequestMiddleware(getResourceDetailValidator),
  ResourcesController.deleteResource,
);

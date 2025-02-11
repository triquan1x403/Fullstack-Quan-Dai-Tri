import { NextFunction, Request, Response } from 'express';

import { PaginationQuerySchema } from '../../commons';
import ResourcesService from './resources.service';
import {
  CreateResourceBodySchema,
  UpdateResourceBodySchema,
  UpdateResourceParamSchema,
} from './validators';
import { GetResourceDetailParamSchema } from './validators/get-resource.validator';

class ResourcesController {
  async createResource(
    req: Request<unknown, unknown, CreateResourceBodySchema>,
    res: Response,
    next: NextFunction,
  ) {
    const { firstName, lastName } = req.body;
    const result = await ResourcesService.createResource({ firstName, lastName });
    return next(result);
  }

  async updateResource(
    req: Request<UpdateResourceParamSchema, unknown, UpdateResourceBodySchema>,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const result = await ResourcesService.updateResource(id, { firstName, lastName });
    return next(result);
  }

  async getDetailResource(
    req: Request<GetResourceDetailParamSchema>,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const result = await ResourcesService.getDetailResource(id);
    return next(result);
  }

  async getListResource(
    req: Request<unknown, unknown, unknown, PaginationQuerySchema>,
    res: Response,
    next: NextFunction,
  ) {
    const { take, page } = req.query;
    const result = await ResourcesService.getListResource({ take, page });
    return next(result);
  }

  async deleteResource(
    req: Request<GetResourceDetailParamSchema>,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const result = await ResourcesService.deleteResource(id);
    return next(result);
  }
}

export default new ResourcesController();

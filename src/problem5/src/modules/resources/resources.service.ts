import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { PaginationQuerySchema, PrismaTransaction, SuccessPayloadType } from '../../commons';
import { PrismaService } from '../../databases';
import { createHttpItem, createHttpPaginate, paginationHandler } from '../../utilities';
import { ResourceType } from './types';
import { CreateResourceBodySchema, UpdateResourceBodySchema } from './validators';

class ResourcesService {
  async createResource(
    params: CreateResourceBodySchema,
  ): Promise<SuccessPayloadType<ResourceType>> {
    const prismaTransaction = await PrismaService.$transaction(
      async (transaction: PrismaTransaction) => {
        try {
          const resourceModel = transaction.resourceModel;

          const createdResource = await resourceModel.create({
            data: { firstName: params.firstName, lastName: params.lastName },
          });
          return createHttpItem<ResourceType>(
            createdResource,
            'Successfully created resource!',
            StatusCodes.CREATED,
          );
        } catch (error) {
          return error;
        }
      },
    );
    return prismaTransaction as SuccessPayloadType<ResourceType>;
  }

  async updateResource(
    id: string,
    params: UpdateResourceBodySchema,
  ): Promise<SuccessPayloadType<ResourceType>> {
    const prismaTransaction = await PrismaService.$transaction(
      async (transaction: PrismaTransaction) => {
        try {
          const resourceModel = transaction.resourceModel;

          const foundResource = await resourceModel.findUnique({ where: { id, deletedAt: null } });

          if (!foundResource) {
            return createHttpError(StatusCodes.NOT_FOUND, 'Resource does not exist!');
          }

          const updateResource = await resourceModel.update({
            where: { id: foundResource.id },
            data: { ...params },
          });

          return createHttpItem<ResourceType>(
            updateResource,
            'Successfully updated resource!',
            StatusCodes.OK,
          );
        } catch (error) {
          return error;
        }
      },
    );
    return prismaTransaction as SuccessPayloadType<ResourceType>;
  }

  async getDetailResource(id: string): Promise<SuccessPayloadType<ResourceType> | unknown> {
    try {
      const foundResource = await PrismaService.resourceModel.findUnique({
        where: { id, deletedAt: null },
      });

      if (!foundResource) {
        return createHttpError(StatusCodes.NOT_FOUND, 'Resource does not exist!');
      }

      return createHttpItem<ResourceType>(foundResource, 'Successfully!', StatusCodes.OK);
    } catch (error) {
      return error;
    }
  }

  async getListResource(
    params: PaginationQuerySchema,
  ): Promise<SuccessPayloadType<ResourceType> | unknown> {
    try {
      const { take, page, skip } = paginationHandler(params.take, params.page);

      const total = await PrismaService.resourceModel.count({
        where: { deletedAt: null },
      });

      const resources = await PrismaService.resourceModel.findMany({
        where: { deletedAt: null },
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return createHttpPaginate<ResourceType>(
        resources,
        { count: total, options: { take, page } },
        'Successfully',
        StatusCodes.OK,
      );
    } catch (error) {
      return error;
    }
  }

  async deleteResource(id: string): Promise<SuccessPayloadType<null> | unknown> {
    const prismaTransaction = await PrismaService.$transaction(
      async (transaction: PrismaTransaction) => {
        try {
          const resourceModel = transaction.resourceModel;

          const foundResource = await resourceModel.findUnique({ where: { id, deletedAt: null } });

          if (!foundResource) {
            return createHttpError(StatusCodes.NOT_FOUND, 'Resource does not exist!');
          }

          await resourceModel.update({
            where: { id: foundResource.id },
            data: { deletedAt: new Date() },
          });

          return createHttpItem(null, 'Successfully deleted resource!', StatusCodes.OK);
        } catch (error) {
          return error;
        }
      },
    );
    return prismaTransaction;
  }
}

export default new ResourcesService();

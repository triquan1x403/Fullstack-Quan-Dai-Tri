import { PrismaClient } from '@zenstackhq/runtime/enhance';

export type PrismaTransaction = Parameters<PrismaClient['$transaction']>[0] extends (
  client: infer T,
) => unknown
  ? T
  : never;

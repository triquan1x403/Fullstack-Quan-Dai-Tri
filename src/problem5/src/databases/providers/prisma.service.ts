import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { log } from 'console';

class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async connect() {
    await this.$connect();
    log('PrismaORM connection is establishing!');
  }
}

export default enhance(new PrismaService());

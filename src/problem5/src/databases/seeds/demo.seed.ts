import { log } from 'console';

import { PrismaTransaction } from '../../commons';
import PrismaService from '../providers/prisma.service';

async function seed() {
  try {
    await PrismaService.$transaction(async (prisma: PrismaTransaction) => {
      await prisma.$queryRaw`TRUNCATE TABLE "DemoModel"`;

      await prisma.demoModel.create({
        data: { username: 'example@mail.com', password: 'example' },
      });
    });
    log('🌱: Seed Demo Successfully!');
  } catch (error) {
    log('Seed Demo Error:', error);
  }
}

seed();

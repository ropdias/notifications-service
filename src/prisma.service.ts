import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // This creates an event listener that before the connection with Prisma closes we want to close our application
    // So if the connection with the database closes(for whatever reason) we shutdown our application
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

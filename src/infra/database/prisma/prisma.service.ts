import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Services are classes without a specific purpose. Can be anything actually. For example a connection with the database.
// Here we are using the concept of "Dependency injection"
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // This constructor can be used to show in the console every query that is executed
  // constructor() {
  //   super({ log: ['query'] });
  // }

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

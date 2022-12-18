import { Body, Controller, Get, Post } from '@nestjs/common';
// import { MailService } from './mail/mail.service';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

// If you use 'app' here all routes will start with /app for example /app/hello
// @Controller('app')
@Controller('notifications')
export class AppController {
  // Here we are using the "dependency inversion principle"
  // Who will instantiate this class will tell which dependencies this class needs
  // For example we can tell that we are using the abstract class "MailService"
  // and whoever uses this controller can choose to instantiate with any class that implements that abstract class
  // constructor(private readonly mailService: MailService) {}

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  // When we create a CreateNofiticationBody class we are using the TypeScript to validate and do not allow that we use a different schema
  // TypeScript wont allow us to get something from the body that doesnt exist.
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    });
  }
}

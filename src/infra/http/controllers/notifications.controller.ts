import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  // Here we are using the "dependency inversion principle"
  // Who will instantiate this class will tell which dependencies this class needs
  constructor(private sendNotification: SendNotification) {}

  // For example we can tell that we are using the abstract class "MailService"
  // and whoever uses this controller can choose to instantiate with any class that implements that abstract class
  // constructor(private readonly mailService: MailService) {}

  // @Get()
  // list() {
  //   return this.prisma.notification.findMany();
  // }

  // When we create a CreateNofiticationBody class we are using the TypeScript to validate and do not allow that we use a different schema
  // TypeScript wont allow us to get something from the body that doesnt exist.
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}

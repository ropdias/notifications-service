import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

// We create this to return an Object in the execute() method instead of an instance of a Class
// Because if in the future we need to add more information to the Object we
// just add it instead of changing the code where it already works
interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    // We should persist in the DB now
    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}

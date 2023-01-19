import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
// import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

// We could use the object below to test notificationsRepository directly
// but we will pass this code to an InMemoryNotificationsRepository
// const notifications: Notification[] = [];
// const notificationsRepository = {
//   async create(notification: Notification) {
//     notifications.push(notification);
//   },
// };

// Since we are using the concept of "Dependency inversion" who tells SendNotification() what repository to use is not itself
// but the test that is creating a new instance of that class, and it's easier to test.
describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});

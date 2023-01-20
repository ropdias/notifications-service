import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

// The "Module" is like a central point to import other files (like other modules, controllers and providers)
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}

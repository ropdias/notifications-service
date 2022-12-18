import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';

// Services are classes without a specific purpose. Can be anything actually. For example a connection with the database.
// Here we are using the concept of "Dependency injection"
@Injectable()
export class PostmarkMailService implements MailService {
  sendEmail(): string {
    return 'Postmark Mail!';
  }
}

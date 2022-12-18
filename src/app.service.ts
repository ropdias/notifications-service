import { Injectable } from '@nestjs/common';

// Services are classes without a specific purpose. Can be anything actually. For example a connection with the database.
// Here we are using the concept of "Dependency injection"
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

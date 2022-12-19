import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
// import { MailService } from './mail/mail.service';
// import { PostmarkMailService } from './mail/postmark-mail.service';
// import { SMTPMailService } from './mail/smtp-mail.service';
// import { PrismaService } from './infra/database/prisma.service';

// The "Module" is like a central point to import other files
// The app.module.ts is the principal module of our application that can import other modules

// Nest automatically can understand that when a controller needs a dependency to instantiate
// the class (for example an "AppService") it can look that inside our "Module" there is a
// provider(in the "providers" attribute) named "AppService"

@Module({
  imports: [HttpModule, DatabaseModule], // We could import DatabaseModule here again, there is no problem in doing that
  // controllers: [AppController],
  // All classes in the providers needs to have the @Injectable decorator
  // It's easier to test our application when we use the "dependency inversion principle" from SOLID
  // providers: [AppService], // Here we are using a class directly
  // If we need to provide an abstract class we can use it like that: [{provide: MailService, useClass: PostmarkMailService}]
  // providers: [
  //   PrismaService,
  //   // {
  //   //   provide: MailService,
  //   //   // useClass: SMTPMailService,
  //   //   useClass: PostmarkMailService,
  //   // },
  // ],
})
export class AppModule {}

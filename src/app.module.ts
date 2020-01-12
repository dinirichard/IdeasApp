import { AuthModule } from './shared/auth/auth.module';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ConfigModule } from 'nestjs-dotenv';

@Module({
  imports: [
    AuthModule,
    UserModule, IdeaModule, MongooseModule.forRoot(
      'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-cehti.azure.mongodb.net/ideas-app?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }

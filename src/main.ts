import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
      // 'http://localhost:3000', // react
      // 'http://localhost:8081', // react-native
    ],
  });
  await app.listen(3000);

}
bootstrap();

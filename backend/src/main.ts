import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  await app.listen(3000, '0.0.0.0');
  console.log('SERVER REALLY LISTENING ON 3000');
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  console.log(`NODE_ENV [ ${process.env.NODE_ENV} ]`);
  console.log(`API_SERVER_PORT [ localhost://${process.env.PORT} ]`);
  console.log(`DATABASE_SYNC [ ${process.env.DATABASE_SYNC} ]`);
  console.log(`DATABASE_URL [ ${process.env.DATABASE_URL} ]`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

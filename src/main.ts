import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  console.log(`NODE_ENV [ ${process.env.NODE_ENV} ]`);
  console.log(`API_SERVER_PORT [ localhost:/${process.env.PORT} ]`);
  console.log(`DATABASE_URL [ ${process.env.DATABASE_URL} ]`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

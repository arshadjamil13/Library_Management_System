import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

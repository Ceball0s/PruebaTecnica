import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🔥 Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // el frontend Angular
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  // 🔥 Activar validación DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

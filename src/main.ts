import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from "process";
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT || 3000;
  
  // Configure CORS
  app.use(
    cors({
      origin: [
        'http://localhost:4200',
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.FRONTEND_URL,
      ].filter(Boolean),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  // Serve static files (for uploaded files)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: false,
  }));

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT, () => {
    console.log(`🚀 CV Builder API is running on port ${PORT}`);
    console.log(`📁 Static files served from: /uploads/`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

bootstrap();

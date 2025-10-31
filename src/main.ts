import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4200;

  // Enable CORS
  app.use(
    cors({
      origin: [
        "http://localhost:4200",
        "http://localhost:3000",
        "http://localhost:4201"
      ],
    })
  );

  // Global validation pipe with optimized configuration
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Cleansheet AI Builder API")
    .setDescription("API documentation for Cleansheet AI Builder backend service")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .addTag("auth", "Authentication endpoints")
    .addTag("user", "User management endpoints")
    .addTag("template", "Template management endpoints")
    .addTag("cv-content", "CV content management endpoints")
    .addTag("upload", "File upload endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Base endpoint
  app.use("/", (req, res, next) => {
    if (req.path === "/" && req.method === "GET") {
      res.json({ 
        message: "Cleansheet ai-builder backend service",
        docs: "/api-docs"
      });
    } else {
      next();
    }
  });

  await app.listen(PORT, '0.0.0.0');
  console.log(`Cleansheet ai-builder backend service running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}

bootstrap();


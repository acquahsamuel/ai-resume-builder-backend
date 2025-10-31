import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
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

  // Base endpoint
  app.use("/", (req, res, next) => {
    if (req.path === "/" && req.method === "GET") {
      res.json({ message: "Cleansheet ai-builder backend service" });
    } else {
      next();
    }
  });

  await app.listen(PORT, '0.0.0.0');
  console.log(`Cleansheet ai-builder backend service running on port ${PORT}`);
}

bootstrap();


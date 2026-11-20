import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const allowedOrigins = (
    process.env.NEXMAIL_ALLOWED_ORIGINS ?? "http://localhost:5173"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.setGlobalPrefix("", { exclude: [] });
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Origin is not allowed."), false);
    },
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableShutdownHooks();

  const port = Number(process.env.API_PORT ?? 3000);
  await app.listen(port, "127.0.0.1");
}

void bootstrap();

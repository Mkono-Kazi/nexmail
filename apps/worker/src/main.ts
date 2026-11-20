import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { Worker } from "bullmq";
import { Redis } from "ioredis";

const logger = new Logger("NexmailWorker");
const connection = new Redis(
  process.env.VALKEY_URL ?? "redis://127.0.0.1:6379",
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker(
  "nexmail-operations",
  async (job) => {
    // Deliberately no operation handlers yet: the first provider slice adds
    // explicit, idempotent handlers. Never log job payloads (they may be sensitive).
    logger.warn(`No handler registered for operation type: ${job.name}`);
    throw new Error(`Unsupported operation type: ${job.name}`);
  },
  { connection },
);

worker.on("completed", (job) => logger.log(`Operation ${job.id} completed.`));
worker.on("failed", (job) =>
  logger.error(`Operation ${job?.id ?? "unknown"} failed.`),
);
worker.on("error", () => logger.error("Worker connection reported an error."));

async function shutdown(signal: string) {
  logger.log(`Received ${signal}; closing worker.`);
  await worker.close();
  await connection.quit();
  process.exit(0);
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

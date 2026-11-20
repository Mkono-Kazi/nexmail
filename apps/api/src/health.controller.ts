import { Controller, Get } from "@nestjs/common";
import { HealthResponseSchema } from "@nexmail/contracts";
import { PrismaService } from "@nexmail/database";
import { Redis } from "ioredis";

@Controller("api/v1/health")
export class HealthController {
  constructor(private readonly database: PrismaService) {}

  @Get()
  async getHealth() {
    const [databaseStatus, queueStatus] = await Promise.all([
      this.database.$queryRaw`SELECT 1`
        .then(() => "ok" as const)
        .catch(() => "unavailable" as const),
      this.checkQueue(),
    ]);

    return HealthResponseSchema.parse({
      service: "api",
      status:
        databaseStatus === "ok" && queueStatus === "ok" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      dependencies: { database: databaseStatus, queue: queueStatus },
    });
  }

  private async checkQueue() {
    const client = new Redis(
      process.env.VALKEY_URL ?? "redis://127.0.0.1:6379",
      {
        lazyConnect: true,
        connectTimeout: 1_500,
        maxRetriesPerRequest: 0,
        retryStrategy: () => null,
      },
    );
    try {
      await client.connect();
      await client.ping();
      return "ok" as const;
    } catch {
      return "unavailable" as const;
    } finally {
      client.disconnect();
    }
  }
}

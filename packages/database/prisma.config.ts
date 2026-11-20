import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

const packageDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(packageDirectory, "../../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env.DATABASE_MIGRATION_URL ??
      "postgresql://nexmail:nexmail@127.0.0.1:5432/nexmail?schema=public",
  },
});

import { z } from "zod";

export const DependencyStatusSchema = z.enum(["ok", "unavailable"]);

export const HealthResponseSchema = z.object({
  service: z.literal("api"),
  status: z.enum(["ok", "degraded"]),
  timestamp: z.iso.datetime(),
  dependencies: z.object({
    database: DependencyStatusSchema,
    queue: DependencyStatusSchema,
  }),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

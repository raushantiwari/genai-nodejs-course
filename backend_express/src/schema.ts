import { z } from "zod";
export const AskResultSchema = z.object({
  summery: z
    .string()
    .min(1, "Summery is required")
    .max(500, "Summery must be less than 500 characters"),
  confidence: z.number().min(0).max(1, "Confidence must be between 0 and 1"),
});

export type AskResult = z.infer<typeof AskResultSchema>;

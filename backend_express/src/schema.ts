import { z } from "zod";
export const AskResultSchema = z.object({
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(1000, "Summary must be less than 1000 characters"),
  confidence: z.number().min(0).max(1, "Confidence must be between 0 and 1"),
});

export type AskResult = z.infer<typeof AskResultSchema>;

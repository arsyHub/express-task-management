import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

export const updateProjectSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
});

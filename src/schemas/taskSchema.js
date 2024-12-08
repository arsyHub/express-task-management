import { z } from "zod";

export const createTaskSchema = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  status: z.string().min(3).max(255),
  tag: z.string().optional(),
  order: z.number().optional(),
  due_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must be in the format YYYY-MM-DD")
    .optional(),
  user_ids: z.array(z.string().uuid()).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  status: z.string().min(3).max(255).optional(),
  tag: z.string().optional(),
  order: z.number().optional(),
  due_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must be in the format YYYY-MM-DD")
    .optional(),
  user_ids: z.array(z.string().uuid()).optional(),
});

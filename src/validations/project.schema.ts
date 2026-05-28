import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return selected >= today;
    }, "Due date cannot be in the past"),

  status: z.enum(["Pending", "In-Progress", "Completed"]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

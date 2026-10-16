import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or less"),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  color: z.enum([
    "#C9F2EB",
    "#f9fad5",
    "#fdf0d9",
    "#D6E5D6",
    "#FFE4EB",
    "#F8D2CF",
    "#E4F1ED",
    "#E4DBF5",
    "#F5EBF2",
  ]),
  tags: z
    .string()
    .trim()
    .refine(
      (value) => {
        const tags = value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

        return tags.length <= 3;
      },
      { message: "You can add up to 3 tags only." },
    )
    .refine(
      (value) => {
        const tags = value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

        return (
          new Set(tags.map((tag) => tag.toLowerCase())).size === tags.length
        );
      },
      { message: "Tags must be unique." },
    ),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

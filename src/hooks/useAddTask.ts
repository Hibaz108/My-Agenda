import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { TaskFormValues } from "@/schemas/taskSchema";

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TaskFormValues) => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You must be logged in to create a task.");
      }

      const tags = values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          color: values.color,
          tags,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

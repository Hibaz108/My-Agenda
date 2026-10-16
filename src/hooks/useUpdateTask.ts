import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { TaskType } from "@/types/types";

type UpdateTaskInput = {
  id: string;
  updates: Partial<
    Pick<
      TaskType,
      "title" | "description" | "status" | "priority" | "color" | "tags"
    >
  >;
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateTaskInput) => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

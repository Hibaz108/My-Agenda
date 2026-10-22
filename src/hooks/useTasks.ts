import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { TaskType } from "@/types/types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<TaskType[]> => {
      const supabase = createClient();

      const { data, error } = await supabase.from("tasks").select("*");

      if (error) {
        throw error;
      }

      return data;
    },
  });
}


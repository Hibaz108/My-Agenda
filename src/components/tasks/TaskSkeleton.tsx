import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeleton = () => {
  return (
    <div
      className="min-h-28 bg-card p-4 space-y-3 border border-border rounded-3xl"
      aria-hidden="true"
    >
      {/* title and action buttons */}
      <div className="flex justify-between items-center gap-3">
        <Skeleton className="h-5 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="size-4" />
        </div>
      </div>
      {/* title and action buttons */}

      {/* desc */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      {/* === desc === */}

      {/* tags */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      {/* === tags === */}

      {/* priority and date */}
      <div className="flex justify-between items-end pt-3 border-t border-border">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      {/* === priority and date === */}
    </div>
  );
};

export default TaskSkeleton;

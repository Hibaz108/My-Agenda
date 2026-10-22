"use client";

import type { TaskBoardContentProps } from "@/types/types";
import { GoTasklist } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import TaskColumn from "@/components/tasks/TaskColumn";
import TaskSkeleton from "@/components/tasks/TaskSkeleton";

const columns = [
  { label: "To Do", status: "todo" },
  { label: "In Progress", status: "in-progress" },
  { label: "Completed", status: "completed" },
];

const TaskBoardContent = ({
  tasks,
  sortedTasks,
  isPending,
  hasError,
  onRetry,
  onAddTask,
  onClearAll,
}: TaskBoardContentProps) => {
  return (
    <>
      {isPending ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Loading tasks"
        >
          {columns.map((column) => (
            <div
              key={column.status}
              className="mt-4 space-y-3 rounded-2xl bg-primary/30 p-3"
            >
              <Skeleton className="h-9 rounded-2xl" />

              <div className="space-y-2">
                <TaskSkeleton />
                <TaskSkeleton />
              </div>
            </div>
          ))}
        </div>
      ) : hasError ? (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 py-8 text-center"
        >
          <p className="text-lg text-muted-foreground font-semibold">
            We couldn&apos;t load your tasks.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="bg-primary px-4 py-2 text-sm text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-colors"
          >
            Try again
          </button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-2 bg-card p-2 mt-3 text-center rounded-2xl ">
          <GoTasklist className="size-8 text-primary" strokeWidth={1} />

          <h4 className="text-lg text-primary md:text-xl font-semibold">
            No tasks yet
          </h4>
          <p className="text-muted-foreground text-sm">
            Create your first task and start shaping your day.
          </p>

          <button
            type="button"
            className="bg-primary py-2 px-4 text-sm text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors"
            onClick={onAddTask}
          >
            + Add task
          </button>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-3 bg-card p-6 mt-3 text-center rounded-2xl">
          <GoTasklist className="size-8 text-primary" strokeWidth={1} />

          <h3 className="text-lg text-primary font-semibold">
            No tasks match your search or filters.
          </h3>

          <p className="text-sm text-muted-foreground">
            Try a different search or clear your filters.
          </p>

          <button
            type="button"
            onClick={onClearAll}
            className="bg-primary px-4 py-2 text-sm text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors"
          >
            Clear All
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((column) => (
            <TaskColumn
              key={column.status}
              label={column.label}
              tasks={sortedTasks.filter(
                (task) => task.status === column.status,
              )}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskBoardContent;

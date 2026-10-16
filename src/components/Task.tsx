// icons
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// shadcn
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
// other
import type { TaskType } from "@/types/types";
import { useState } from "react";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import TaskModal from "./TaskModal";
import { useCompleteTask } from "@/hooks/useCompleteTask";

const Task = ({ task }: { task: TaskType }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();

  const priorityTextColor =
    task.priority === "low"
      ? "text-green-400"
      : task.priority === "medium"
        ? "text-blue-400"
        : "text-red-400";

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => {
        setShowDeleteConfirmation(false);
        toast.success("Task deleted successfully.", {
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("Failed to delete task. Please try again.", {
          position: "top-center",
        });
      },
    });
  };

  const handleComplete = (checked: boolean) => {
    completeTask({ id: task.id, completed: checked });
  };

  return (
    <>
      {showTaskModal && (
        <TaskModal onClose={() => setShowTaskModal(false)} task={task} />
      )}

      {showDeleteConfirmation && (
        <div className="inset-0 fixed flex justify-center items-center bg-black/40 z-50">
          <div className=" w-full max-w-md mx-4 bg-background p-5 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-heading">Delete this task?</h4>
            <p className="text-sm text-muted-foreground">{`"${task.title}" will be removed permanently.`}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isPending}
                className="bg-card p-2 text-sm text-primary font-semibold rounded-xl disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="bg-primary p-2 text-sm text-primary-foreground font-semibold rounded-xl transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{ backgroundColor: task.color }}
        className="min-h-28 group p-4 rounded-3xl border-2 border-transparent
      hover:border-primary duration-500 transition-colors"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`task-${task.id}`}
              aria-label={`Mark ${task.title} as completed`}
              checked={task.status === "completed"}
              onCheckedChange={(checked) => {
                if (isCompleting || typeof checked !== "boolean") return;
                handleComplete(checked);
              }}
              disabled={isCompleting}
            />

            <h3
              className={`text-xl font-heading font-semibold ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>
          </div>

          {/* delete & edit btns container */}
          <div className="flex lg:hidden lg:group-hover:flex gap-2">
            <button
              type="button"
              className="text-muted-foreground"
              aria-label={`Edit ${task.title}`}
              onClick={() => setShowTaskModal(true)}
            >
              <FaPen aria-hidden="true" className="size-3" />
            </button>

            <button
              type="button"
              className="text-red-500"
              aria-label={`Delete ${task.title}`}
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <MdDelete aria-hidden="true" className="size-4" />
            </button>
          </div>
          {/* === delete & edit btns container === */}
        </div>

        <p className="text-muted-foreground text-xs">{task.description}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-2 my-3 text-center">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/30 py-1 px-4 text-xs text-muted-foreground font-semibold rounded-3xl"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* === tags ===*/}

        <div className="flex justify-between items-end pt-2 border-t border-border">
          {/* priority */}
          <div
            className={`w-16 h-5 flex items-center justify-center bg-card mt-2 text-xs font-semibold rounded-3xl 
        shadow-sm ${priorityTextColor}`}
          >
            {task.priority}
          </div>
          {/* === priority === */}

          <p className="text-gray-400 text-sm">
            {task.created_at.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Task;

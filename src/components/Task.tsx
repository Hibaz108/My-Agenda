// icons
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// shadcn
import { Checkbox } from "@/components/ui/checkbox";
// other
import type { TaskType } from "@/types/types";

const Task = ({ id, title, description, priority, tag }: TaskType) => {
  const priorityTextColor =
    priority === "low"
      ? "text-green-400"
      : priority === "medium"
        ? "text-blue-400"
        : "text-red-400";

  return (
    <div
      className="min-h-28 group bg-background p-4 rounded-3xl border-2 border-transparent
    hover:border-primary duration-500 transition-colors"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`task-${id}`}
            aria-label={`Mark ${title} as completed`}
          />

          <h3 className="text-xl font-heading font-semibold">{title}</h3>
        </div>

        {/* delete & edit btns container */}
        <div className="flex lg:hidden lg:group-hover:flex gap-2">
          <button
            type="button"
            className="text-muted-foreground"
            aria-label="Edit task"
          >
            <FaPen aria-hidden="true" className="size-3" />
          </button>

          <button
            type="button"
            className="text-red-500"
            aria-label="Delete task"
          >
            <MdDelete aria-hidden="true" className="size-4" />
          </button>
        </div>
        {/* === delete & edit btns container === */}
      </div>

      <p className="text-muted-foreground text-xs">{description}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-2 my-3 text-center">
        <span className="bg-primary/30 py-1 px-4 text-xs text-muted-foreground font-semibold rounded-3xl">
          #{tag}
        </span>
      </div>
      {/* === tags ===*/}

      <div className="flex justify-between items-end pt-2 border-t border-border">
        {/* priority */}
        <div
          className={`w-16 h-5 flex items-center justify-center bg-card mt-2 text-xs font-semibold rounded-3xl 
        shadow-sm ${priorityTextColor}`}
        >
          {priority}
        </div>
        {/* === priority === */}

        <p className="text-gray-400 text-sm">05/10/2026</p>
      </div>
    </div>
  );
};

export default Task;

import Task from "./Task";
import type { TaskType } from "@/types/types";
import { TbMoodEmpty } from "react-icons/tb";

type TaskColumnProps = {
  label: string;
  tasks: TaskType[];
};

const TaskColumn = ({ label, tasks }: TaskColumnProps) => {
  return (
    <div className="bg-card p-3 mt-4 space-y-3 rounded-2xl">
      <div className="flex justify-between items-center bg-primary/20 py-2 px-4 text-primary rounded-2xl">
        <h3 className="text-sm font-semibold">• {label}</h3>

        <div className="h-5 w-5 flex items-center justify-center bg-card text-xs font-semibold rounded-full">
          <span className="text-primary/70 ">{tasks.length}</span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="w-full h-44 flex flex-col justify-center items-center gap-2 p-2 rounded-2xl border border-dashed border-border">
          <span>
            <TbMoodEmpty className="size-8 text-muted-foreground" />
          </span>
          <p className="text-sm text-muted-foreground font-medium">
            No tasks yet.
          </p>
        </div>
      ) : (
        <div className="min-h-44 space-y-2">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;

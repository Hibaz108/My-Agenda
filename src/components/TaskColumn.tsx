import Task from "./Task";

type TaskColumnProps = {
  label: string;
};

const TaskColumn = ({ label }: TaskColumnProps) => {
  return (
    <div className="bg-card p-3 mt-4 space-y-3 rounded-2xl">
      <div
        className={`flex justify-between items-center bg-primary/20 py-2 px-4 text-primary rounded-2xl`}
      >
        <h3 className="text-sm font-semibold">• {label}</h3>

        <div className="h-5 w-5 flex items-center justify-center bg-card text-xs font-semibold rounded-full">
          <span className="text-primary/70 ">2</span>
        </div>
      </div>

      <div className="min-h-44 space-y-2">
        <Task
          id={1}
          title="Finish my work"
          description="no description"
          priority="high"
          tag="word"
        />
      </div>
    </div>
  );
};

export default TaskColumn;

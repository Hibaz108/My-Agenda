"use client";
// react , next
import { useState } from "react";
import { useRouter } from "next/navigation";
// icons
import { PiSignOutBold } from "react-icons/pi";
// shadcn
import { toast } from "sonner";
// components
import TaskModal from "@/components/tasks/TaskModal";
import TaskControls from "@/components/dashboard/TaskControls";
import TaskBoardContent from "@/components/dashboard/TaskBoardContent";
// other
import type { DashboardClientProps } from "@/types/types";
import { createClient } from "@/lib/supabase/client";
import { useTasks } from "@/hooks/useTasks";

const DashboardClient = ({ user }: DashboardClientProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("custom");
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();
  const router = useRouter();
  const now = new Date();
  const date = now.toDateString().split(" ").slice(0, 3).join(" ");
  const fullName = user.user_metadata?.full_name?.trim() || "User";
  const firstName = fullName.split(/\s+/)[0];
  const initial = firstName[0].toUpperCase();

  const { data: tasks = [], isPending, error, refetch } = useTasks();

  const query = searchQuery.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;

    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "priority": {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      case "title_asc":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to sign out. Please try again.");
      return;
    }
    router.replace("/login");
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedStatus("all");
    setSelectedPriority("all");
    setSortBy("custom");
  };

  return (
    <>
      {isTaskModalOpen && (
        <TaskModal onClose={() => setIsTaskModalOpen(false)} />
      )}

      <div className="min-h-[90svh] w-full max-w-5xl flex flex-col mx-auto bg-background p-5 rounded-2xl shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl text-primary font-heading font-bold">
            My Agenda
          </h1>

          <div className="relative">
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={isAccountMenuOpen}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-primary rounded-full cursor-pointer hover:bg-primary-hover transition-colors "
            >
              <span className="text-lg text-primary-foreground font-semibold">
                {initial}
              </span>
            </button>

            <div
              className={`absolute top-full right-0 w-64 p-4 mt-1 rounded-2xl divide-y divide-border bg-primary/95 transition-all duration-300  ${
                isAccountMenuOpen
                  ? "opacity-100 visible scale-100"
                  : "opacity-0 invisible scale-95"
              }`}
            >
              <div className="pb-2">
                <h4
                  className="text-xl text-primary-foreground font-bold font-heading 
                tracking-wider"
                >
                  {fullName}
                </h4>

                <p className="text-sm text-background">{user.email}</p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 pt-2 text-primary-foreground font-semibold"
                onClick={() => {
                  setIsAccountMenuOpen(false);
                  handleLogout();
                }}
              >
                <PiSignOutBold /> Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <p className="uppercase text-sm text-primary">
            Your workspace / {date}
          </p>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-3xl md:text-4xl text-heading font-heading font-semibold">
              Hi, {firstName}
            </h2>

            <button
              type="button"
              className="bg-primary py-2 px-4 rounded-xl text-sm text-primary-foreground 
              hover:bg-primary-hover duration-500 transition-colors "
              onClick={() => setIsTaskModalOpen(true)}
            >
              + Add task
            </button>
          </div>

          <p className="mt-2 text-sm">
            {tasks.length} tasks •{" "}
            <span className="text-green-500">
              {tasks.filter((task) => task.status === "completed").length} done
            </span>
          </p>
        </div>

        <TaskControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TaskBoardContent
          tasks={tasks}
          sortedTasks={sortedTasks}
          isPending={isPending}
          hasError={!!error}
          onRetry={() => {
            void refetch();
          }}
          onAddTask={() => setIsTaskModalOpen(true)}
          onClearAll={handleClearAll}
        />
      </div>
    </>
  );
};

export default DashboardClient;

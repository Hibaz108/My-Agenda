"use client";
// react , next
import { useState } from "react";
import { useRouter } from "next/navigation";
// icons
import { PiSignOutBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
// components
import TaskColumn from "@/components/TaskColumn";
import TaskModal from "@/components/TaskModal";
import TaskSkeleton from "@/components/TaskSkeleton";
// other
import type { DashboardClientProps } from "@/types/types";
import { createClient } from "@/lib/supabase/client";
import { useTasks } from "@/hooks/useTasks";

const statuses = [
  { label: "All statuses", value: "all" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const priorities = [
  { label: "All priorities", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const sortOptions = [
  { label: "Custom order", value: "custom" },
  { label: "Priority", value: "priority" },
  { label: "Newest first", value: "newest" },
  { label: "Title A-Z", value: "title_asc" },
];

const DashboardClient = ({ user }: DashboardClientProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const now = new Date();
  const date = now.toDateString().split(" ").slice(0, 3).join(" ");
  const fullName = user.user_metadata?.full_name?.trim() || "User";
  const firstName = fullName.split(/\s+/)[0];
  const initial = firstName[0].toUpperCase();

  const { data: tasks = [], isPending, error, refetch } = useTasks();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to sign out. Please try again.");
      return;
    }
    router.replace("/login");
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

        <div className="flex flex-col justify-center lg:flex-row lg:items-center gap-2 bg-card p-2 mt-3 rounded-lg ">
          {/* search */}
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full py-1.5 pl-8 rounded-lg bg-card border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Search tasks, tags..."
            />

            <span className="absolute left-1.5 top-2 text-muted-foreground">
              <IoMdSearch className="size-6" />
            </span>
          </div>
          {/* === search === */}

          <div className="flex flex-wrap gap-2">
            {/* statuses */}
            <Select items={statuses} defaultValue="all">
              <SelectTrigger id="statuses">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {statuses.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* === statuses === */}

            {/* priorities */}
            <Select items={priorities} defaultValue="all">
              <SelectTrigger id="priorities">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {priorities.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* === priorities === */}

            {/* order */}
            <Select items={sortOptions} defaultValue="custom">
              <SelectTrigger id="order">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* === order === */}
          </div>
        </div>

        {isPending ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            aria-label="Loading tasks"
          >
            {["todo", "in-progress", "completed"].map((status) => (
              <div
                key={status}
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
        ) : error ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <p className="text-lg text-muted-foreground font-semibold">
              We couldn&apos;t load your tasks.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="bg-primary px-4 py-2 text-sm text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Try again
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-2 bg-card p-2 mt-3 text-center rounded-2xl ">
            <span >
              <GoTasklist className="size-8 text-primary" strokeWidth={1} />
            </span>

            <h4 className="text-lg text-primary md:text-xl font-semibold">No tasks yet</h4>
            <p className="text-muted-foreground text-sm">
              Create your first task and start shaping your day.
            </p>

            <button
              type="button"
              className="bg-primary py-2 px-4 text-sm text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors"
              onClick={() => setIsTaskModalOpen(true)}
            >
              + Add task
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "To Do", status: "todo" },
              { label: "In Progress", status: "in-progress" },
              { label: "Completed", status: "completed" },
            ].map((column) => (
              <TaskColumn
                key={column.status}
                label={column.label}
                tasks={tasks.filter((task) => task.status === column.status)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardClient;

"use client";
import { useState } from "react";
// icons
import { PiSignOutBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TaskColumn from "@/components/TaskColumn";

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

const order = [
  { label: "Custom order", value: "custom" },
  { label: "Priority", value: "priority" },
  { label: "Newest first", value: "newest" },
  { label: "Title A-Z", value: "title_asc" },
];

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[90svh] flex justify-center">
      <div className="w-full max-w-5xl bg-background p-5 rounded-2xl shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl text-primary font-heading font-bold">
            My Agenda
          </h1>

          <div className="relative">
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center bg-primary rounded-full cursor-pointer hover:bg-primary-hover transition-colors "
            >
              <span className="uppercase text-sm text-primary-foreground font-semibold">
                HM
              </span>
            </button>

            <div
              className={`absolute top-full right-0 w-64 p-4 mt-1 rounded-2xl divide-y divide-border bg-primary/95 transition-all duration-300  ${
            isOpen
              ? "opacity-100 visible scale-100"
              : "opacity-0 invisible scale-95"
          }`}
            >
              <div className="pb-2">
                <h4
                  className="text-xl text-primary-foreground font-bold font-heading 
                tracking-wider"
                >
                  Hiba Mari
                </h4>

                <p className="text-sm text-background">hiba@gmail.com</p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 pt-2 text-primary-foreground font-semibold"
              >
                <PiSignOutBold /> Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <p className="uppercase text-sm text-primary">
            Your workspace / 06/10/2026
          </p>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-3xl md:text-4xl text-heading font-heading font-semibold">
              Hi, Hiba
            </h2>

            <button
              type="button"
              className="bg-primary py-2 px-4 rounded-xl text-sm text-primary-foreground 
              hover:bg-primary-hover duration-500 transition-colors "
            >
              + Add task
            </button>
          </div>

          <p className="mt-2 text-sm">
            5 tasks •<span className="text-green-500"> 0 done</span>
          </p>
        </div>

        <div className="flex flex-col justify-center lg:flex-row lg:items-center gap-2 bg-white p-2 mt-3 rounded-lg ">
          {/* search */}
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full py-1.5 pl-8 rounded-lg bg-white border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Search tasks, tags..."
            />

            <span className="absolute left-1.5 top-2 text-gray-500">
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
            <Select items={order} defaultValue="custom">
              <SelectTrigger id="order">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {order.map((item) => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["To Do", "In Progress", "Completed"].map((column) => (
            <TaskColumn key={column} label={column} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

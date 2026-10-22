"use client";

import type { TaskControlsProps } from "@/types/types";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TaskControls = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  sortBy,
  onSortChange,
}: TaskControlsProps) => {
  return (
    <div className="flex flex-col justify-center lg:flex-row lg:items-center gap-2 bg-card p-2 mt-3 rounded-lg ">
      {/* search */}
      <div className="relative flex-1">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-1.5 pl-8 pr-2 rounded-lg bg-card border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Search tasks, tags..."
        />

        <span className="absolute left-1.5 top-2 text-muted-foreground">
          <IoMdSearch className="size-6" />
        </span>
      </div>
      {/* === search === */}

      <div className="flex flex-wrap gap-2">
        {/* statuses */}
        <Select
          items={statuses}
          value={selectedStatus}
          onValueChange={(value) => {
            if (value) {
              onStatusChange(value);
            }
          }}
        >
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
        <Select
          items={priorities}
          value={selectedPriority}
          onValueChange={(value) => {
            if (value) {
              onPriorityChange(value);
            }
          }}
        >
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
        <Select
          items={sortOptions}
          value={sortBy}
          onValueChange={(value) => {
            if (value) {
              onSortChange(value);
            }
          }}
        >
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
  );
};

export default TaskControls;

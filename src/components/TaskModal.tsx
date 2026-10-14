"use client";
// react
import { useState } from "react";
// icons
import { IoClose } from "react-icons/io5";
// shadcn
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// other
import type { TaskModalProps } from "@/types/types";

const colors = [
  "#C9F2EB",
  "#f9fad5",
  "#fdf0d9",
  "#D6E5D6",
  "#FFE4EB",
  "#F8D2CF",
  "#E4F1ED",
  "#E4DBF5",
  "#F5EBF2",
];

const statuses = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const TaskModal = ({ onClose }: TaskModalProps) => {
  const [selectedColor, setSelectedColor] = useState("#C9F2EB");

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <form className="w-full max-w-sm bg-background p-6 mx-4 space-y-4 rounded-2xl shadow-sm">
        <div>
          <div className="flex justify-between">
            <h3 className="font-heading text-2xl font-bold">New task</h3>

            <button type="button" onClick={onClose} aria-label="Close modal">
              <IoClose aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Add a task to your workspace.
          </p>
        </div>

        {/* title */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-muted-foreground font-semibold"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            className="bg-card px-2 py-1 text-sm rounded-lg outline-none focus-visible:ring-2 
            focus-visible:ring-primary"
            placeholder="Clean my room"
          />
        </div>
        {/* === title === */}

        {/* description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-muted-foreground font-semibold"
          >
            Description
          </label>

          <textarea
            id="description"
            className="min-h-16 bg-card px-2 py-1 text-sm rounded-lg outline-none 
            focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Optional details..."
          />
        </div>
        {/* === description === */}

        {/* status and priority */}
        <div className="flex gap-2">
          <Field>
            <FieldLabel htmlFor="statuses">Status</FieldLabel>
            <Select items={statuses} defaultValue="todo">
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
          </Field>

          <Field>
            <FieldLabel htmlFor="priorities">Priority</FieldLabel>

            <Select items={priorities} defaultValue="medium">
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
          </Field>
        </div>
        {/* === status and priority === */}

        {/* colors palette */}
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground font-semibold">Color</p>

          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={`Choose color ${color}`}
                aria-pressed={selectedColor === color}
                style={{ backgroundColor: color }}
                className={`h-6 w-6 rounded-full transition-all ${
                  selectedColor === color ? "border-2 border-black" : "border-0"
                }`}
              />
            ))}
          </div>
        </div>
        {/* === colors palette === */}

        {/* tags */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="text-muted-foreground font-semibold">
            Tags
          </label>

          <input
            id="tags"
            type="text"
            className="bg-card px-2 py-1 text-sm rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="work, school, shopping"
          />
        </div>
        {/* === tags === */}

        {/* form actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-card p-2 text-sm text-primary font-semibold rounded-xl"
          >
            Cancel
          </button>

          <button
            type="button"
            className="bg-primary p-2 text-sm text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover
             transition-colors"
          >
            Create task
          </button>
        </div>
        {/* === form actions === */}
      </form>
    </div>
  );
};

export default TaskModal;

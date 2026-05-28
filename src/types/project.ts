export type ProjectStatus = "Pending" | "In-Progress" | "Completed";

export interface Project {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status?: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const STATUS_OPTIONS = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "In-Progress",
    label: "In Progress",
  },
  {
    value: "Completed",
    label: "Completed",
  },
];

export const filter_options = [
  { label: "Sort by date", value: "asc" },
  // { label: "Upcoming First", value: "asc" },
  { label: "Most Recent", value: "desc" },
];

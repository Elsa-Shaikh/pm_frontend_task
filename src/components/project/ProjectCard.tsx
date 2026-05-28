import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type { Project } from "../../types/project";
import { formatDate } from "../../utils/helper";

interface Props {
  project: Project;

  onEdit: () => void;

  onDelete: () => void;
}

const statusColors = {
  Pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20",
  "In-Progress": "bg-blue-500/15 text-blue-500 border-blue-500/20",
  Completed: "bg-green-500/15 text-green-500 border-green-500/20",
};

const ProjectCard = ({ project, onEdit, onDelete }: Props) => {
  return (
    // <div className="card transition-theme rounded-3xl p-6 hover:-translate-y-1">
    <div className="card transition-theme w-full min-w-0 max-w-full overflow-hidden rounded-3xl p-6 hover:-translate-y-1">
      <div className="mb-5 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-xl font-semibold wrap-break-word">
            {project?.title}
          </h2>

          <p className="text-sm text-[var(--text-muted)] wrap-break-word line-clamp-2">
            {project?.description}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            statusColors[project?.status ?? "Pending"]
          }`}
        >
          {project?.status}
        </span>
      </div>

      <div className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <CalendarDays size={16} />
        <span>
          <span className="font-medium">Due Date:</span>{" "}
          {formatDate(project?.dueDate)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-2xl bg-[var(--primary)] px-4 py-3 font-medium text-white hover:bg-[var(--primary-hover)]"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex h-12 w-12 items-center cursor-pointer justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

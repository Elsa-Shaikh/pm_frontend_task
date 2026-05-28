import { FolderOpen } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="card rounded-3xl py-20 text-center">
      <div className="mb-5 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
          <FolderOpen size={40} />
        </div>
      </div>

      <h3 className="mb-3 text-2xl font-bold">No Projects Found</h3>

      <p className="text-[var(--text-muted)]">
        Start by creating your first project
      </p>
    </div>
  );
};

export default EmptyState;

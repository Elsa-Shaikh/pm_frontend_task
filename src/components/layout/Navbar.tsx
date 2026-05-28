import ThemeToggle from "../common/ThemeToggle";
import { FolderKanban } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-lg">
            <FolderKanban size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Project Dashboard</h1>

            <p className="text-sm text-[var(--text-muted)]">
              Manage your workflow efficiently
            </p>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProjectSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative w-full md:w-[340px]">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        size={18}
      />

      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] py-3 pl-11 pr-4 placeholder:text-[var(--text-muted)] dark:placeholder:text-[var(--text-muted)]"
      />
    </div>
  );
};

export default ProjectSearch;

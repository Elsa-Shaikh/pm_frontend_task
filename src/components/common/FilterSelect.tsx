import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { filter_options } from "../../types/project";

interface Props {
  sort: string;
  setSort: (value: string) => void;
}

const FilterSelect = ({ sort, setSort }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected =
    filter_options.find((o) => o.value === sort) || filter_options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-[220px]">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center cursor-pointer justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm transition hover:opacity-90"
      >
        <span>{selected.label}</span>
        {open ? (
          <ChevronUp size={18} className="opacity-70" />
        ) : (
          <ChevronDown size={18} className="opacity-70" />
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg">
          {filter_options.map((opt) => {
            const isActive = sort === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => {
                  setSort(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-left cursor-pointer text-sm transition hover:bg-[var(--bg-hover)]       ${
                  isActive
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--text)] hover:bg-[var(--primary)] hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;

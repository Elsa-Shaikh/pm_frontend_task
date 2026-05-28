import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  required,
  placeholder = "Select option",
}: Props) => {
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-[var(--danger)]">*</span>}
      </label>

      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-left text-[var(--text)] transition hover:border-[var(--primary)] ${
            open ? "border-[var(--primary)]" : ""
          }`}
        >
          <span
            className={
              selectedOption ? "text-[var(--text)]" : "text-[var(--text-muted)]"
            }
          >
            {selectedOption?.label || placeholder}
          </span>

          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-xl">
            {options.map((option) => {
              const active = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);

                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition cursor-pointer ${
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text)] hover:bg-[var(--primary)] hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
};

export default CustomSelect;

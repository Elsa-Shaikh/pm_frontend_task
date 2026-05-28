import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  min?: string;
}

const DatePicker = ({
  label,
  value,
  onChange,
  error,
  required,
  min,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = min ? new Date(min) : today;

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const totalDays = daysInMonth(currentMonth);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // normalize date (fix timezone + compare issue)
  const normalize = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const formatDate = (day: number) => {
    const yearNum = year;
    const monthNum = month + 1;

    const mm = String(monthNum).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    return `${yearNum}-${mm}-${dd}`;
  };
  const isDisabled = (day: number) => {
    const d = normalize(new Date(year, month, day));

    const minD = normalize(new Date(minDate));

    return d < minD;
  };

  return (
    <div className="space-y-2" ref={ref}>
      {/* label */}
      <label className="text-sm font-medium">
        {label} {required && <span className="text-[var(--danger)]">*</span>}
      </label>

      {/* input button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center cursor-pointer justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text)] transition hover:border-[var(--primary)]"
      >
        <span
          className={value ? "text-[var(--text)]" : "text-[var(--text-muted)]"}
        >
          {value || "Select date"}
        </span>

        <Calendar size={18} />
      </button>

      {/* calendar */}
      {open && (
        <div className="absolute z-50 mt-2 w-80 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-xl">
          {/* header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month - 1))}
              className="text-[var(--text)] hover:text-[var(--primary)] cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <p className="text-sm font-medium">
              {currentMonth.toLocaleString("default", { month: "long" })} {year}
            </p>

            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month + 1))}
              className="text-[var(--text)] hover:text-[var(--primary)] cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* days grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {days.map((day) => {
              const dateStr = formatDate(day);

              const disabled = isDisabled(day);

              const isSelected = value === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(dateStr);
                    setOpen(false);
                  }}
                  className={`rounded-xl p-2 transition ${
                    disabled
                      ? "cursor-not-allowed text-gray-400 line-through"
                      : isSelected
                        ? "bg-[var(--primary)] text-white cursor-pointer"
                        : "hover:bg-[var(--primary)] hover:text-white text-[var(--text)] cursor-pointer"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* error */}
      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
};

export default DatePicker;

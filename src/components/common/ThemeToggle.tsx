import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { darkMode, handleToggleTheme } = useTheme();

  return (
    <button
      onClick={handleToggleTheme}
      className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] transition hover:scale-105"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;

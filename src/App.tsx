import { useEffect } from "react";
import "./index.css";
import { useTheme } from "./hooks/useTheme";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleTheme } from "../store/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    darkMode,
    handleToggleTheme,
  };
};

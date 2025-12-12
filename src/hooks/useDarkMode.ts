import { useUIStore } from '../stores/uiStore';

export const useDarkMode = () => {
  const { darkMode, toggleDarkMode } = useUIStore();

  return {
    darkMode,
    toggleDarkMode,
  };
};

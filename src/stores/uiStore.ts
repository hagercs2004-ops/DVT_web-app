import { create } from 'zustand';

interface UIState {
  darkMode: boolean;
  showModal: boolean;
  modalContent: string;
  loading: boolean;
  sidebarOpen: boolean;

  toggleDarkMode: () => void;
  setShowModal: (show: boolean) => void;
  setModalContent: (content: string) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const isDarkMode =
    savedDarkMode ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  }

  return {
    darkMode: isDarkMode,
    showModal: false,
    modalContent: '',
    loading: false,
    sidebarOpen: true,

    toggleDarkMode: () =>
      set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem('darkMode', String(newDarkMode));
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
      }),

    setShowModal: (show) => set({ showModal: show }),
    setModalContent: (content) => set({ modalContent: content }),
    setLoading: (loading) => set({ loading }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  };
});

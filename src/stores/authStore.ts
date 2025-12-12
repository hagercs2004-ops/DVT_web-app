import { create } from 'zustand';

interface AuthState {
  currentUser: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  getCurrentUser: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: localStorage.getItem('currentUser') || 'Guest',
  isAuthenticated: !!localStorage.getItem('currentUser'),

  login: (username: string) => {
    localStorage.setItem('currentUser', username);
    set({ currentUser: username, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    set({ currentUser: null, isAuthenticated: false });
  },

  getCurrentUser: () => {
    return get().currentUser;
  },
}));

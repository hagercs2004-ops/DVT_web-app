import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { currentUser, isAuthenticated, login, logout } = useAuthStore();

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };
};

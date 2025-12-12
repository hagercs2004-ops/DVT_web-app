import { create } from 'zustand';
import type { ActivityLog } from '../types';

interface ActivityState {
  activities: ActivityLog[];
  addActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
  getActivities: () => ActivityLog[];
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],

  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          ...activity,
        },
        ...state.activities,
      ].slice(0, 100),
    })),

  clearActivities: () => set({ activities: [] }),

  getActivities: () => {
    return get().activities;
  },
}));

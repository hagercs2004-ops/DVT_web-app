import { useState } from 'react';

export interface UploadFile {
  file: File;
  id: string;
  progress: number;
  error?: string;
}

export const useUploadQueue = () => {
  const [queue, setQueue] = useState<UploadFile[]>([]);

  const addToQueue = (files: File[]) => {
    const newFiles = files.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    }));
    setQueue((prev) => [...prev, ...newFiles]);
  };

  const updateProgress = (id: string, progress: number) => {
    setQueue((prev) =>
      prev.map((f) => (f.id === id ? { ...f, progress } : f))
    );
  };

  const updateError = (id: string, error: string) => {
    setQueue((prev) =>
      prev.map((f) => (f.id === id ? { ...f, error } : f))
    );
  };

  const removeFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((f) => f.id !== id));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return {
    queue,
    addToQueue,
    updateProgress,
    updateError,
    removeFromQueue,
    clearQueue,
  };
};

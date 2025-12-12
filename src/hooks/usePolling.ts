import { useEffect, useState } from 'react';
import { documentApi } from '../api/client';
import type { Document } from '../types';

export const usePolling = (interval: number = 5000) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    if (!isPolling) return;

    const poll = async () => {
      try {
        const response = await documentApi.getDocuments(1, 100);
        setDocuments(response.data);
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    poll();
    const pollInterval = setInterval(poll, interval);

    return () => clearInterval(pollInterval);
  }, [interval, isPolling]);

  return { documents, setIsPolling };
};

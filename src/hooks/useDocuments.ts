import { useEffect, useState } from 'react';
import { useDocumentStore } from '../stores/documentStore';
import { documentApi } from '../api/client';

export const useDocuments = (page: number = 1, limit: number = 10) => {
  const { setDocuments, setTotalPages, searchQuery } = useDocumentStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await documentApi.getDocuments(page, limit, searchQuery);
        setDocuments(response.data);
        // Calculate total pages from response
        setTotalPages(Math.ceil((response.data.length || 10) / limit));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [page, limit, searchQuery, setDocuments, setTotalPages]);

  return { loading, error };
};

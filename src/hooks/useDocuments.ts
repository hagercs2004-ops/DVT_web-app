import { useEffect, useState } from 'react';
import { useDocumentStore } from '../stores/documentStore';
import { documentApi } from '../api/client';
import type { Document } from '../types';

export const useDocuments = () => {
  const { setDocuments, searchQuery } = useDocumentStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentApi.getDocuments();
      let documents = response.data;
      
      // Filter by search query on client side
      if (searchQuery) {
        documents = documents.filter((doc: Document) => 
          doc.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setDocuments(documents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [searchQuery]);

  return { loading, error, refetch: fetchDocuments };
};

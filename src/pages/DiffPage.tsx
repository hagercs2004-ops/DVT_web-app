import React, { useState, useEffect } from 'react';
import { useDocumentStore } from '../stores/documentStore';
import DiffViewer from '../components/diff/DiffViewer';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import VersionTimeline from '../components/document/VersionTimeline';
import { documentApi } from '../api/client';
import toast from 'react-hot-toast';
import type { Comparison, TextDiffResult } from '../types';

const DiffPage: React.FC = () => {
  const { currentDocument } = useDocumentStore();
  const [v1, setV1] = useState<number | null>(null);
  const [v2, setV2] = useState<number | null>(null);
  const [comparison, setComparison] = useState<Comparison | TextDiffResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!currentDocument || v1 === null || v2 === null) {
      toast.error('Select two versions to compare');
      return;
    }

    setLoading(true);
    try {
      const response = await documentApi.compareVersions(currentDocument.name, v1, v2);
      setComparison(response.data);
    } catch (error) {
      toast.error('Failed to compare versions');
    } finally {
      setLoading(false);
    }
  };

  if (!currentDocument) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Select a document to view diffs</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Compare Versions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Version 1
          </label>
          <select
            value={v1 || ''}
            onChange={(e) => setV1(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select version</option>
            {currentDocument.versions?.map((v) => (
              <option key={v.version} value={v.version}>
                v{v.version}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Version 2
          </label>
          <select
            value={v2 || ''}
            onChange={(e) => setV2(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select version</option>
            {currentDocument.versions?.map((v) => (
              <option key={v.version} value={v.version}>
                v{v.version}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        onClick={handleCompare}
        loading={loading}
        disabled={v1 === null || v2 === null}
      >
        Compare
      </Button>

      {comparison && <DiffViewer comparison={comparison} isLoading={loading} />}
    </div>
  );
};

export default DiffPage;

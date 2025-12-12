import React, { useState, useEffect } from 'react';
import UploadArea from '../components/upload/UploadArea';
import UploadQueue from '../components/upload/UploadQueue';
import DocumentGrid from '../components/document/DocumentGrid';
import SearchBar from '../components/search/SearchBar';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';
import { useDocuments } from '../hooks/useDocuments';
import { useDocumentStore } from '../stores/documentStore';
import { useActivityStore } from '../stores/activityStore';
import { useUploadQueue } from '../hooks/useUploadQueue';
import { documentApi } from '../api/client';
import { downloadFile } from '../utils/download';

const HomePage: React.FC = () => {
  const { documents, setCurrentDocument } = useDocumentStore();
  const { addActivity } = useActivityStore();
  const { queue, addToQueue, updateProgress, removeFromQueue, clearQueue } = useUploadQueue();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { loading } = useDocuments();

  const handleFilesSelected = async (files: File[]) => {
    setUploadLoading(true);
    addToQueue(files);

    for (const file of files) {
      const queueId = queue[queue.length]?.id;
      try {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            updateProgress(queueId || '', progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            toast.success(`Uploaded ${file.name}`);
            addActivity({
              action: 'upload',
              details: `Uploaded file: ${file.name}`,
            });
            removeFromQueue(queueId || '');
          }
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploadLoading(false);
  };

  const handleDelete = async (name: string) => {
    if (confirm(`Delete document "${name}"?`)) {
      try {
        await documentApi.deleteDocument(name);
        toast.success('Document deleted');
        addActivity({
          action: 'delete',
          details: `Deleted document: ${name}`,
        });
      } catch (error) {
        toast.error('Failed to delete document');
      }
    }
  };

  const handleDownload = async (name: string) => {
    try {
      const response = await documentApi.downloadVersion(name, 1);
      downloadFile(response.data, name);
      addActivity({
        action: 'download',
        details: `Downloaded: ${name}`,
      });
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Document Versions Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and compare document versions efficiently
        </p>
      </div>

      <div className="space-y-4">
        <SearchBar onSearch={() => {}} />
        <UploadArea onFilesSelected={handleFilesSelected} isLoading={uploadLoading} />
        {queue.length > 0 && <UploadQueue queue={queue} onRemove={removeFromQueue} />}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <DocumentGrid
          documents={documents}
          onSelect={setCurrentDocument}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default HomePage;

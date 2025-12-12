import React, { useState } from 'react';
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
  const { queue, addToQueue, updateProgress, updateError, removeFromQueue } = useUploadQueue();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { loading, refetch } = useDocuments();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;
    
    setUploadLoading(true);
    const uploadFiles = files.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    }));
    
    addToQueue(files);

    for (let i = 0; i < uploadFiles.length; i++) {
      const { file, id } = uploadFiles[i];
      try {
        // Extract document name from filename (remove extension)
        const documentName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        updateProgress(id, 10);
        
        await documentApi.uploadFile(file, documentName);
        
        updateProgress(id, 100);
        toast.success(`Uploaded ${file.name}`);
        addActivity({
          action: 'upload',
          user: 'User',
          document: file.name,
          details: `Uploaded file: ${file.name}`,
        });
        
        setTimeout(() => removeFromQueue(id), 1000);
      } catch (error: any) {
        const errorMsg = error?.response?.data?.message || 'Upload failed';
        updateError(id, errorMsg);
        toast.error(`Failed to upload ${file.name}: ${errorMsg}`);
      }
    }

    setUploadLoading(false);
    // Refresh document list after upload
    await refetch();
  };

  const handleDelete = async (name: string) => {
    if (confirm(`Delete document "${name}"?`)) {
      try {
        await documentApi.deleteDocument(name);
        toast.success('Document deleted');
        addActivity({
          action: 'delete',
          user: 'User',
          document: name,
          details: `Deleted document: ${name}`,
        });
        await refetch();
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
        user: 'User',
        document: name,
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

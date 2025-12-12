import React from 'react';
import DocumentCard from './DocumentCard';
import type { Document } from '../../types';

interface DocumentGridProps {
  documents: Document[];
  onSelect: (doc: Document) => void;
  onDelete: (name: string) => void;
  onCompare?: (name: string) => void;
  onDownload: (name: string) => void;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onSelect,
  onDelete,
  onCompare,
  onDownload,
}) => {
  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No documents found. Upload one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.name}
          document={doc}
          onSelect={onSelect}
          onDelete={onDelete}
          onCompare={onCompare}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;

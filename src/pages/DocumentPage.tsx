import React from 'react';
import { useDocumentStore } from '../stores/documentStore';
import VersionTimeline from '../components/document/VersionTimeline';
import CommentSection from '../components/comment/CommentSection';
import ActivityLog from '../components/activity/ActivityLog';
import Card from '../components/common/Card';
import { formatDate, formatFileSize } from '../utils/formatting';

const DocumentPage: React.FC = () => {
  const { currentDocument } = useDocumentStore();
  const [comments, setComments] = React.useState<any[]>([]);

  const handleAddComment = async (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        text,
        user: 'Current User',
        timestamp: new Date(),
      },
    ]);
  };

  if (!currentDocument) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Select a document to view details</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {currentDocument.display_name || currentDocument.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{currentDocument.name}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {currentDocument.file_type}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatFileSize(currentDocument.size || 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatDate(currentDocument.created_date)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Versions</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {currentDocument.versions?.length || 0}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {currentDocument.versions && (
            <Card className="p-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Version History
              </h2>
              <VersionTimeline versions={currentDocument.versions} />
            </Card>
          )}

          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
          />
        </div>

        <div>
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;

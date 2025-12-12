import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatDate, formatFileSize } from '../../utils/formatting';
import type { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onSelect: (doc: Document) => void;
  onDelete: (name: string) => void;
  onCompare?: (name: string) => void;
  onDownload: (name: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onSelect,
  onDelete,
  onCompare,
  onDownload,
}) => {
  return (
    <Card className="p-4 cursor-pointer hover:border-primary-500 transition-all">
      <div className="space-y-3">
        <div onClick={() => onSelect(document)} className="min-h-[60px]">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
            {document.display_name || document.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {document.name}
          </p>
        </div>

        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p>Versions: {document.versions?.length || 0}</p>
          <p>Size: {formatFileSize(document.size || 0)}</p>
          {document.created_date && (
            <p>Created: {formatDate(document.created_date)}</p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="primary">{document.file_type}</Badge>
          {document.versions && document.versions.length > 1 && (
            <Badge variant="success">Multiple versions</Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onSelect(document)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onDownload(document.name)}
          >
            Download
          </Button>
          {onCompare && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onCompare(document.name)}
            >
              Compare
            </Button>
          )}
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(document.name)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;

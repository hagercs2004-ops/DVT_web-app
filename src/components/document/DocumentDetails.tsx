import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import VersionTimeline from './VersionTimeline';
import { formatDate, formatFileSize } from '../../utils/formatting';
import type { Document, Version } from '../../types';

interface DocumentDetailsProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onVersionSelect?: (version: Version) => void;
}

const DocumentDetails: React.FC<DocumentDetailsProps> = ({
  document,
  isOpen,
  onClose,
  onVersionSelect,
}) => {
  const [selectedVersions, setSelectedVersions] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  if (!document) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Details">
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {document.display_name || document.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{document.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Type:</span>
            <p className="font-medium">{document.file_type}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Size:</span>
            <p className="font-medium">{formatFileSize(document.size || 0)}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Created:</span>
            <p className="font-medium">{formatDate(document.created_date)}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Versions:</span>
            <p className="font-medium">{document.versions?.length || 0}</p>
          </div>
        </div>

        {document.versions && document.versions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Versions</h4>
            <VersionTimeline
              versions={document.versions}
              onVersionSelect={onVersionSelect}
            />
          </div>
        )}
      </div>

      <Modal isOpen={false} onClose={onClose} title="Close">
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </Modal>
    </Modal>
  );
};

export default DocumentDetails;

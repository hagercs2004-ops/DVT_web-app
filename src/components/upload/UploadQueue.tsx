import React from 'react';
import UploadProgress from './UploadProgress';
import type { UploadFile } from '../../hooks/useUploadQueue';

interface UploadQueueProps {
  queue: any[];
  onRemove?: (id: string) => void;
}

const UploadQueue: React.FC<UploadQueueProps> = ({ queue, onRemove }) => {
  if (queue.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white">Upload Queue</h3>
      {queue.map((item) => (
        <UploadProgress
          key={item.id}
          filename={item.file.name}
          progress={item.progress}
          error={item.error}
          onRemove={() => onRemove?.(item.id)}
        />
      ))}
    </div>
  );
};

export default UploadQueue;

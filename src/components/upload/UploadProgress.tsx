import React from 'react';
import Button from '../common/Button';

interface UploadProgressProps {
  filename: string;
  progress: number;
  error?: string;
  onRemove?: () => void;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  filename,
  progress,
  error,
  onRemove,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg space-y-2">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {filename}
          </p>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        {onRemove && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onRemove}
          >
            ✕
          </Button>
        )}
      </div>

      {!error && (
        <>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{progress}%</p>
        </>
      )}
    </div>
  );
};

export default UploadProgress;

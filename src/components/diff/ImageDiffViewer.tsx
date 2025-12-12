import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

interface ImageDiffViewerProps {
  originalUrl: string;
  modifiedUrl: string;
  description?: string;
}

const ImageDiffViewer: React.FC<ImageDiffViewerProps> = ({
  originalUrl,
  modifiedUrl,
  description,
}) => {
  const [mode, setMode] = useState<'side-by-side' | 'overlay'>('side-by-side');

  return (
    <Card className="p-4 space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === 'side-by-side' ? 'primary' : 'secondary'}
          onClick={() => setMode('side-by-side')}
        >
          Side by Side
        </Button>
        <Button
          size="sm"
          variant={mode === 'overlay' ? 'primary' : 'secondary'}
          onClick={() => setMode('overlay')}
        >
          Overlay
        </Button>
      </div>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}

      {mode === 'side-by-side' ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">Original</h4>
            <img
              src={originalUrl}
              alt="Original"
              className="w-full border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">Modified</h4>
            <img
              src={modifiedUrl}
              alt="Modified"
              className="w-full border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
        </div>
      ) : (
        <div className="relative inline-block w-full">
          <img
            src={originalUrl}
            alt="Original"
            className="w-full border border-gray-300 dark:border-gray-600 rounded"
          />
          <div className="absolute inset-0 opacity-50">
            <img
              src={modifiedUrl}
              alt="Modified"
              className="w-full h-full border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageDiffViewer;

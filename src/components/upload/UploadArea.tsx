import React, { useRef } from 'react';
import { MAX_FILE_SIZE } from '../../utils/constants';
import { formatFileSize } from '../../utils/formatting';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  isLoading?: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFilesSelected, isLoading = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.size <= MAX_FILE_SIZE
    );
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center
        transition-all duration-200 cursor-pointer
        ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
        }
      `}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            onFilesSelected(Array.from(e.target.files));
          }
        }}
        className="hidden"
        disabled={isLoading}
      />

      <div className="space-y-2">
        <div className="text-4xl">📁</div>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Drag and drop files here
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            or click to select files
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
        </p>
      </div>
    </div>
  );
};

export default UploadArea;

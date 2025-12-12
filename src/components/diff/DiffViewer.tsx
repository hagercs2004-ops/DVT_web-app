import React from 'react';
import TextDiffViewer from './TextDiffViewer';
import ImageDiffViewer from './ImageDiffViewer';
import DiffMetrics from './DiffMetrics';
import type { TextDiffResult, Comparison } from '../../types';

interface DiffViewerProps {
  comparison: Comparison | TextDiffResult | null;
  isLoading?: boolean;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ comparison, isLoading = false }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading diff...</div>;
  }

  if (!comparison) {
    return <div className="text-center py-8 text-gray-500">Select versions to compare</div>;
  }

  const isTextDiff = 'diff_result' in comparison;
  const isImageDiff = 'image_url1' in comparison;

  return (
    <div className="space-y-4">
      {isTextDiff && (
        <>
          {(comparison as TextDiffResult).metrics && (
            <DiffMetrics metrics={(comparison as TextDiffResult).metrics} />
          )}
          {(comparison as TextDiffResult).diff_result && (
            <TextDiffViewer diff={(comparison as TextDiffResult).diff_result} />
          )}
        </>
      )}

      {isImageDiff && (
        <ImageDiffViewer
          originalUrl={(comparison as Comparison).image_url1}
          modifiedUrl={(comparison as Comparison).image_url2}
          description={(comparison as Comparison).description}
        />
      )}
    </div>
  );
};

export default DiffViewer;

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

  // Check if it's a TextDiffResult (has 'diff' property)
  const isTextDiff = 'diff' in comparison;

  return (
    <div className="space-y-4">
      {isTextDiff ? (
        <>
          {(comparison as TextDiffResult).metrics && (
            <DiffMetrics metrics={(comparison as TextDiffResult).metrics} />
          )}
          {(comparison as TextDiffResult).diff && (
            <TextDiffViewer diff={(comparison as TextDiffResult).diff} />
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Comparison Result
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Document: <span className="font-medium">{(comparison as Comparison).document_name}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Comparing: v{(comparison as Comparison).version_1} → v{(comparison as Comparison).version_2}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              File Type: <span className="font-medium">{(comparison as Comparison).file_type}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Modified: <span className={`font-medium ${(comparison as Comparison).modifications_detected ? 'text-red-600' : 'text-green-600'}`}>
                {(comparison as Comparison).modifications_detected ? 'Yes' : 'No'}
              </span>
            </p>
            {(comparison as Comparison).summary && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Summary</h4>
                {(comparison as Comparison).summary.additions !== undefined && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Additions: {(comparison as Comparison).summary.additions}
                  </p>
                )}
                {(comparison as Comparison).summary.deletions !== undefined && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deletions: {(comparison as Comparison).summary.deletions}
                  </p>
                )}
                {(comparison as Comparison).summary.total_changes !== undefined && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Changes: {(comparison as Comparison).summary.total_changes}
                  </p>
                )}
                {(comparison as Comparison).summary.change_percentage !== undefined && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Change: {(comparison as Comparison).summary.change_percentage.toFixed(2)}%
                  </p>
                )}
              </div>
            )}
            
            {/* Show image diff for image files */}
            {(comparison as Comparison).comparison_type === 'image' && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Visual Diff</h4>
                <img 
                  src={`/api/image-diff/${(comparison as Comparison).document_name}/${(comparison as Comparison).version_1}/${(comparison as Comparison).version_2}`}
                  alt="Image difference visualization"
                  className="max-w-full border border-gray-300 dark:border-gray-600 rounded-lg"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Red highlights indicate differences between versions
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffViewer;

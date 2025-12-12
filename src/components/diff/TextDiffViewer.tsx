import React from 'react';
import Card from '../common/Card';

interface TextDiffViewerProps {
  diff: string[];
}

const TextDiffViewer: React.FC<TextDiffViewerProps> = ({ diff }) => {
  return (
    <Card className="p-4 overflow-x-auto">
      <pre className="text-xs font-mono whitespace-pre-wrap break-words">
        {diff.map((line, idx) => {
          let className = '';
          
          if (line.startsWith('+')) {
            className = 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
          } else if (line.startsWith('-')) {
            className = 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
          } else if (line.startsWith('@')) {
            className = 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 font-semibold';
          } else if (line.startsWith('---') || line.startsWith('+++')) {
            className = 'text-gray-600 dark:text-gray-400 font-semibold';
          }

          return (
            <div key={idx} className={`px-2 py-0.5 ${className}`}>
              {line}
            </div>
          );
        })}
      </pre>
    </Card>
  );
};

export default TextDiffViewer;

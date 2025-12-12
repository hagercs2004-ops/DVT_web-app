import React from 'react';
import Card from '../common/Card';

interface TextDiffViewerProps {
  diff: Array<{ type: string; content: string }>;
}

const TextDiffViewer: React.FC<TextDiffViewerProps> = ({ diff }) => {
  return (
    <Card className="p-4 overflow-x-auto">
      <pre className="text-xs font-mono whitespace-pre-wrap break-words">
        {diff.map((line, idx) => {
          let className = '';
          let prefix = '  ';

          if (line.type === 'addition') {
            className = 'diff-add';
            prefix = '+ ';
          } else if (line.type === 'deletion') {
            className = 'diff-remove';
            prefix = '- ';
          } else if (line.type === 'context') {
            prefix = '  ';
          }

          return (
            <div key={idx} className={className}>
              {prefix}
              {line.content}
            </div>
          );
        })}
      </pre>
    </Card>
  );
};

export default TextDiffViewer;

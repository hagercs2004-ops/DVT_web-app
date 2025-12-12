import React from 'react';
import Card from '../common/Card';

interface SideBySideDiffProps {
  original: string;
  modified: string;
}

const SideBySideDiff: React.FC<SideBySideDiffProps> = ({ original, modified }) => {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');

  return (
    <Card className="p-4 overflow-x-auto">
      <table className="w-full text-xs font-mono">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="text-left p-2 bg-gray-100 dark:bg-gray-700 w-1/2">
              Original
            </th>
            <th className="text-left p-2 bg-gray-100 dark:bg-gray-700 w-1/2">
              Modified
            </th>
          </tr>
        </thead>
        <tbody>
          {Math.max(originalLines.length, modifiedLines.length) > 0 &&
            Array.from({
              length: Math.max(originalLines.length, modifiedLines.length),
            }).map((_, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2 bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap break-words">
                  {originalLines[idx] || ''}
                </td>
                <td className="p-2 bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap break-words">
                  {modifiedLines[idx] || ''}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
};

export default SideBySideDiff;

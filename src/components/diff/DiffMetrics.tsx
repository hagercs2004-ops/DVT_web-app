import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatNumber } from '../../utils/formatting';
import type { TextDiffMetrics } from '../../types';

interface DiffMetricsProps {
  metrics: TextDiffMetrics;
}

const DiffMetrics: React.FC<DiffMetricsProps> = ({ metrics }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Substantial':
        return 'danger';
      case 'Moderate':
        return 'warning';
      case 'Minor':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">Diff Metrics</h3>
        <Badge variant={getSeverityColor(metrics.severity)}>
          {metrics.severity}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Additions</p>
          <p className="text-lg font-semibold text-green-600">
            {formatNumber(metrics.additions)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Deletions</p>
          <p className="text-lg font-semibold text-red-600">
            {formatNumber(metrics.deletions)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Unchanged</p>
          <p className="text-lg font-semibold text-gray-600">
            {formatNumber(metrics.unchanged_lines || 0)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Total Lines</p>
          <p className="text-lg font-semibold text-primary-600">
            {formatNumber((metrics.additions || 0) + (metrics.deletions || 0) + (metrics.unchanged_lines || 0))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Chars Added</p>
          <p className="text-lg font-semibold text-green-600">
            {formatNumber(metrics.characters_added || 0)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Chars Removed</p>
          <p className="text-lg font-semibold text-red-600">
            {formatNumber(metrics.characters_removed || 0)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400">Net Change</p>
          <p className={`text-lg font-semibold ${
            (metrics.characters_added || 0) >= (metrics.characters_removed || 0)
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {formatNumber((metrics.characters_added || 0) - (metrics.characters_removed || 0))}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DiffMetrics;

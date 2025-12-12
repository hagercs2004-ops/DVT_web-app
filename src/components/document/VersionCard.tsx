import React from 'react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatting';
import type { Version } from '../../types';

interface VersionCardProps {
  version: Version;
  isLatest?: boolean;
  onClick?: () => void;
}

const VersionCard: React.FC<VersionCardProps> = ({
  version,
  isLatest = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        p-3 border rounded-lg cursor-pointer transition-all
        ${
          isLatest
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
        }
      `}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              v{version.version}
            </span>
            {isLatest && <Badge variant="success">LATEST</Badge>}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(version.timestamp)}
          </p>
          {version.notes && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {version.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionCard;

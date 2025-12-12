import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatting';
import { useActivityStore } from '../../stores/activityStore';

const ActivityLog: React.FC = () => {
  const activities = useActivityStore((state) => state.getActivities());

  if (activities.length === 0) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No activities yet
      </Card>
    );
  }

  const getActivityColor = (action: string) => {
    switch (action) {
      case 'upload':
        return 'success';
      case 'delete':
        return 'danger';
      case 'compare':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Recent Activity
      </h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start justify-between gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant={getActivityColor(activity.action)}>
                  {activity.action}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {activity.details}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityLog;

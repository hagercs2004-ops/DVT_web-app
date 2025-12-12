import React from 'react';
import Card from '../common/Card';
import { formatDate } from '../../utils/formatting';
import type { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No comments yet
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Card key={comment.id} className="p-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">
                {comment.user}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(comment.timestamp)}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {comment.text}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;

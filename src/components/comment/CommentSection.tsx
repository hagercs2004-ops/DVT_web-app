import React from 'react';
import Card from '../common/Card';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import type { Comment } from '../../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  isLoading = false,
}) => {
  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      <CommentForm onSubmit={onAddComment} isLoading={isLoading} />
      <CommentList comments={comments} />
    </Card>
  );
};

export default CommentSection;

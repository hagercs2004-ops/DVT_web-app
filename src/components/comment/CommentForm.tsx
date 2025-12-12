import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isLoading = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Add a comment
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500
            resize-vertical"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={!text.trim() || isLoading}
      >
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;

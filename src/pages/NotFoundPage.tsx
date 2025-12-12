import React from 'react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">Page not found</p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => window.location.href = '/'}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;

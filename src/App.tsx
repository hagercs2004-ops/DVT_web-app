import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DiffPage from './pages/DiffPage';
import DocumentPage from './pages/DocumentPage';
import { useDocuments } from './hooks/useDocuments';
import { useDocumentStore } from './stores/documentStore';

type Page = 'home' | 'document' | 'diff';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const { currentDocument } = useDocumentStore();
  useDocuments(1, 10);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Toaster position="bottom-right" />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'document' && currentDocument && <DocumentPage />}
      {currentPage === 'diff' && currentDocument && <DiffPage />}

      {/* Navigation buttons */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button
          onClick={() => handlePageChange('home')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 'home'
              ? 'bg-primary-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
        >
          Home
        </button>
        {currentDocument && (
          <>
            <button
              onClick={() => handlePageChange('document')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'document'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => handlePageChange('diff')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'diff'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              Compare
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default App;

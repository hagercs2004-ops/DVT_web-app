import React from 'react';
import { useDocumentStore } from '../../stores/documentStore';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { documents, currentDocument, setCurrentDocument } = useDocumentStore();

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Documents
        </h2>
        <div className="space-y-2">
          {documents.map((doc) => (
            <button
              key={doc.name}
              onClick={() => setCurrentDocument(doc)}
              className={`
                w-full text-left px-4 py-2 rounded-lg transition-colors
                ${
                  currentDocument?.name === doc.name
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
                }
              `}
            >
              <div className="truncate font-medium">{doc.display_name || doc.name}</div>
              <div className="text-xs opacity-75">{doc.versions?.length || 0} versions</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

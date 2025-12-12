import { create } from 'zustand';
import type { Document, Version } from '../types';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;

  setDocuments: (docs: Document[]) => void;
  setCurrentDocument: (doc: Document | null) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setSearchQuery: (query: string) => void;
  addDocument: (doc: Document) => void;
  removeDocument: (name: string) => void;
  updateDocument: (name: string, doc: Document) => void;
  getDocumentByName: (name: string) => Document | undefined;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  currentDocument: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',

  setDocuments: (docs) => set({ documents: docs }),
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addDocument: (doc) =>
    set((state) => ({
      documents: [doc, ...state.documents],
    })),

  removeDocument: (name) =>
    set((state) => ({
      documents: state.documents.filter((d) => d.name !== name),
    })),

  updateDocument: (name, doc) =>
    set((state) => ({
      documents: state.documents.map((d) => (d.name === name ? doc : d)),
      currentDocument: state.currentDocument?.name === name ? doc : state.currentDocument,
    })),

  getDocumentByName: (name) => {
    return get().documents.find((d) => d.name === name);
  },
}));

import axios from 'axios';
import type {
  Document,
  TextDiffResult,
  Comparison,
  Stats,
} from '../types';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = {
  getDocuments: () =>
    api.get<Document[]>('/api/documents'),

  getDocument: (name: string) =>
    api.get<Document>(`/api/document/${name}`),

  getVersion: (name: string, version: number) =>
    api.get(`/api/version/${name}/${version}`),

  uploadFile: (file: File, documentName: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_name', documentName);
    return api.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteDocument: (name: string) =>
    api.delete(`/api/delete-document/${name}`),

  compareVersions: (name: string, v1: number, v2: number) =>
    api.get<Comparison>(`/api/compare/${name}/${v1}/${v2}`),

  getTextDiff: (name: string, v1: number, v2: number) =>
    api.get<TextDiffResult>(`/api/diff/${name}/${v1}/${v2}`),

  getImageDiff: (name: string, v1: number, v2: number) =>
    api.get(`/api/image-diff/${name}/${v1}/${v2}`, { responseType: 'blob' }),

  downloadVersion: (name: string, version: number) =>
    api.get(`/download/${name}/${version}`, { responseType: 'blob' }),

  rollbackVersion: (name: string, version: number) =>
    api.post(`/api/rollback/${name}`, { version }),

  addComment: (name: string, version: number, text: string) =>
    api.post(`/api/comment/${name}/${version}`, { text }),

  getStats: () =>
    api.get<Stats>('/api/stats'),
};

export default api;

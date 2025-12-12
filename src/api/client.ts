import axios from 'axios';
import type {
  Document,
  TextDiffResult,
  Comparison,
  Stats,
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = {
  getDocuments: (page = 1, limit = 10, q = '') =>
    api.get<Document[]>('/api/documents', { params: { page, limit, q } }),

  getDocument: (name: string) =>
    api.get<Document>(`/api/document/${name}`),

  uploadFile: (formData: FormData) =>
    api.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

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

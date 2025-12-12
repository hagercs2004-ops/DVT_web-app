import axios from 'axios';
import type {
  Document,
  TextDiffResult,
  Comparison,
  Stats,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = {
  getDocuments: (page = 1, limit = 10, q = '') =>
    api.get<Document[]>('/documents', { params: { page, limit, q } }),

  getDocument: (name: string) =>
    api.get<Document>(`/document/${name}`),

  uploadFile: (formData: FormData) =>
    api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteDocument: (name: string) =>
    api.delete(`/delete-document/${name}`),

  compareVersions: (name: string, v1: number, v2: number) =>
    api.get<Comparison>(`/compare/${name}/${v1}/${v2}`),

  getTextDiff: (name: string, v1: number, v2: number) =>
    api.get<TextDiffResult>(`/diff/${name}/${v1}/${v2}`),

  getImageDiff: (name: string, v1: number, v2: number) =>
    api.get(`/image-diff/${name}/${v1}/${v2}`, { responseType: 'blob' }),

  downloadVersion: (name: string, version: number) =>
    api.get(`/download/${name}/${version}`, { responseType: 'blob' }),

  rollbackVersion: (name: string, version: number) =>
    api.post(`/rollback/${name}`, { version }),

  addComment: (name: string, version: number, text: string) =>
    api.post(`/comment/${name}/${version}`, { text }),

  getStats: () =>
    api.get<Stats>('/stats'),
};

export default api;

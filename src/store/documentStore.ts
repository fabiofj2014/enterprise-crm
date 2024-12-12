import { create } from 'zustand';
import type { Document, DocumentVersion, DocumentPermission } from '../types/document';

interface DocumentState {
  documents: Document[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, doc: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  addVersion: (documentId: string, version: Omit<DocumentVersion, 'id' | 'createdAt'>) => void;
  updatePermissions: (documentId: string, permissions: DocumentPermission[]) => void;
  addCategory: (category: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  categories: ['Contratos', 'Propostas', 'Documentos Pessoais', 'Relatórios'],
  isLoading: false,
  error: null,

  addDocument: (newDoc) =>
    set((state) => ({
      documents: [
        ...state.documents,
        {
          ...newDoc,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          versions: []
        }
      ]
    })),

  updateDocument: (id, updatedDoc) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id
          ? { ...doc, ...updatedDoc, updatedAt: new Date() }
          : doc
      )
    })),

  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id)
    })),

  addVersion: (documentId, version) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              version: version.version,
              versions: [
                ...doc.versions,
                {
                  ...version,
                  id: Math.random().toString(36).substr(2, 9),
                  createdAt: new Date()
                }
              ]
            }
          : doc
      )
    })),

  updatePermissions: (documentId, permissions) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, permissions }
          : doc
      )
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category]
    }))
}));
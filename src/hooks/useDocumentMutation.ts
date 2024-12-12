import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDocumentStore } from '../store/documentStore';
import { Document } from '../types/document';
import { createDocumentFromFile } from '../utils/document';

export function useDocumentMutation() {
  const queryClient = useQueryClient();
  const { addDocument, updateDocument, deleteDocument } = useDocumentStore();

  const uploadMutation = useMutation({
    mutationFn: async ({
      file,
      category,
      tags,
      userId
    }: {
      file: File;
      category: string;
      tags: string[];
      userId: string;
    }) => {
      const doc = await createDocumentFromFile(file, category, tags, userId);
      return addDocument(doc as Document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string;
      data: Partial<Document>;
    }) => {
      return updateDocument(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteDocument(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });

  return {
    uploadMutation,
    updateMutation,
    deleteMutation
  };
}
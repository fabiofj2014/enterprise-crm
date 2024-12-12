import { Document } from '../types/document';
import imageCompression from 'browser-image-compression';

export const ACCEPTED_FILE_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  png: 'image/png'
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    return file;
  }
}

export function validateFile(file: File): string | null {
  // Validar tipo de arquivo
  if (!Object.values(ACCEPTED_FILE_TYPES).includes(file.type)) {
    return `Tipo de arquivo não suportado. Tipos aceitos: ${Object.keys(ACCEPTED_FILE_TYPES).join(', ')}`;
  }
  
  // Validar tamanho
  if (file.size > MAX_FILE_SIZE) {
    return `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`;
  }

  // Validar nome do arquivo
  if (!/^[a-zA-Z0-9-_. ]+$/.test(file.name)) {
    return 'Nome do arquivo contém caracteres inválidos';
  }

  return null;
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function getMimeType(extension: string): string {
  return ACCEPTED_FILE_TYPES[extension.toLowerCase() as keyof typeof ACCEPTED_FILE_TYPES] || '';
}

export async function createDocumentFromFile(
  file: File, 
  category: string, 
  tags: string[], 
  userId: string
): Promise<Partial<Document>> {
  // Comprimir imagem se necessário
  const processedFile = await compressImage(file);

  return {
    name: file.name,
    type: file.type,
    size: processedFile.size,
    category,
    tags,
    path: URL.createObjectURL(processedFile),
    createdBy: userId,
    lastModifiedBy: userId,
    permissions: [],
    metadata: {
      customFields: {},
      originalSize: file.size,
      processedSize: processedFile.size,
      compressionApplied: file.size !== processedFile.size
    },
    status: 'draft',
    version: 1,
    versions: []
  };
}

export function generateThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      resolve(''); // Retorna vazio para não-imagens
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Definir dimensões do thumbnail
        const maxSize = 200;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Converter para base64
        resolve(canvas.toDataURL(file.type));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
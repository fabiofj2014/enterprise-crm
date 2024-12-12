export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  version: number;
  versions: DocumentVersion[];
  path: string;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
  permissions: DocumentPermission[];
  metadata: DocumentMetadata;
  status: 'draft' | 'review' | 'approved' | 'archived';
  externalSource?: {
    type: 'google_drive';
    fileId: string;
    lastSync: Date;
  };
  lawInfo?: {
    type: 'law' | 'decree' | 'regulation' | 'other';
    number: string;
    date: Date;
    jurisdiction: string;
    status: 'active' | 'revoked' | 'amended';
    relatedLaws: string[];
    amendments: {
      date: Date;
      description: string;
      documentId: string;
    }[];
  };
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  path: string;
  size: number;
  createdAt: Date;
  createdBy: string;
  comment: string;
  changes?: {
    added: string[];
    removed: string[];
    modified: string[];
  };
}

export interface DocumentPermission {
  id: string;
  documentId: string;
  userId: string;
  role: 'viewer' | 'editor' | 'admin';
  expiresAt?: Date;
  shareLink?: {
    token: string;
    expiresAt: Date;
    allowDownload: boolean;
    accessCount: number;
  };
}

export interface DocumentMetadata {
  description?: string;
  expirationDate?: Date;
  customFields: Record<string, any>;
  relatedTo?: {
    type: 'lead' | 'deal';
    id: string;
  };
  thumbnail?: string;
  originalSize?: number;
  processedSize?: number;
  compressionApplied?: boolean;
}

export interface DocumentFilter {
  categories?: string[];
  tags?: string[];
  status?: Document['status'][];
  dateRange?: {
    start: Date;
    end: Date;
  };
  createdBy?: string[];
  search?: string;
  lawType?: Document['lawInfo']['type'][];
  jurisdiction?: string[];
}
import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export class GoogleDriveService {
  private static instance: GoogleDriveService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          this.isInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async signIn(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return gapi.auth2.getAuthInstance().signIn();
  }

  async signOut(): Promise<void> {
    if (!this.isInitialized) return;
    return gapi.auth2.getAuthInstance().signOut();
  }

  async uploadFile(file: File, folderId?: string): Promise<any> {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: folderId ? [folderId] : undefined
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const accessToken = gapi.auth.getToken().access_token;
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: form
    });

    return response.json();
  }

  async downloadFile(fileId: string): Promise<Blob> {
    const response = await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    });
    return new Blob([response.body], { type: response.headers['Content-Type'] });
  }

  async listFiles(query?: string): Promise<any[]> {
    const response = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, size, modifiedTime)',
      spaces: 'drive'
    });
    return response.result.files;
  }
}

export const googleDriveService = GoogleDriveService.getInstance();
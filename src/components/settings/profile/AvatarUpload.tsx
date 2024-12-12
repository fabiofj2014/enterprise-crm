import React from 'react';
import { Camera } from 'lucide-react';

interface AvatarUploadProps {
  avatar: string | null;
  userName: string;
  onAvatarChange: (file: File) => void;
}

export default function AvatarUpload({ avatar, userName, onAvatarChange }: AvatarUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl text-gray-500">{userName[0]}</span>
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
          <Camera className="h-4 w-4 text-gray-500" />
          <input 
            type="file" 
            className="hidden" 
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div>
        <p className="text-sm text-gray-500">JPG, GIF ou PNG. Máximo 1MB.</p>
      </div>
    </div>
  );
}
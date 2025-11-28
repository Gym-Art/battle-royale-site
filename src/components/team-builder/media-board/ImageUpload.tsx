'use client';

import { uploadMediaImage } from '@/lib/storage/battleRoyaleTeamMedia';
import { useState } from 'react';

interface ImageUploadProps {
  teamId: string;
  mediaId: string;
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
}

export function ImageUpload({
  teamId,
  mediaId,
  onUploadComplete,
  onError,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Upload to Firebase Storage
      const downloadURL = await uploadMediaImage(teamId, mediaId, file);
      onUploadComplete(downloadURL);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to upload image');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Image</label>
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 rounded-lg object-contain border border-surface-muted"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neon-green file:text-text-dark hover:file:bg-neon-yellow file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Max 5MB. JPEG, PNG, WebP, or GIF.
        </p>
        {error && <p className="mt-1 text-sm text-neon-pink">{error}</p>}
        {isUploading && <p className="mt-1 text-sm text-text-secondary">Uploading...</p>}
      </div>
    </div>
  );
}


'use client';

import { processHeadshotImage, uploadHeadshot } from '@/lib/storage/battleRoyaleHeadshots';
import { useState } from 'react';

interface HeadshotUploadProps {
  teamId: string;
  memberId: string;
  currentUrl: string | null;
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
}

export function HeadshotUpload({
  teamId,
  memberId,
  currentUrl,
  onUploadComplete,
  onError,
}: HeadshotUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      // Process image to square aspect ratio
      const processedFile = await processHeadshotImage(file, 400);

      // Upload to Firebase Storage
      const downloadURL = await uploadHeadshot(teamId, memberId, processedFile);

      setPreview(downloadURL);
      onUploadComplete(downloadURL);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to upload headshot');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Headshot</label>
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Headshot preview"
              className="w-32 h-32 rounded-lg object-cover border border-surface-muted"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neon-green file:text-text-dark hover:file:bg-neon-yellow file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Square image recommended (1:1). Max 2MB. JPEG, PNG, or WebP.
        </p>
        {error && <p className="mt-1 text-sm text-neon-pink">{error}</p>}
        {isUploading && <p className="mt-1 text-sm text-text-secondary">Uploading...</p>}
      </div>
    </div>
  );
}


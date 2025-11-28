'use client';

import { uploadMediaImage } from '@/lib/storage/battleRoyaleTeamMedia';
import { createBattleRoyaleTeamMedia, updateBattleRoyaleTeamMedia } from '@/lib/firestore/battleRoyaleTeamMedia';
import { getCurrentUser } from '@/lib/firebase/auth';
import type { BattleRoyaleTeamMediaType } from '@/types/battleRoyaleTeamMedia';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const mediaSchema = z.object({
  type: z.enum(['image', 'link', 'note', 'sticky-note', 'comment']),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional().nullable().or(z.literal('')),
  url: z.string().url('Invalid URL').optional().nullable().or(z.literal('')),
  content: z.string().max(1000, 'Content must be 1000 characters or less').optional().nullable().or(z.literal('')),
  attachedToMediaId: z.string().optional().nullable(),
});

type MediaFormData = z.infer<typeof mediaSchema>;

interface AddMediaModalProps {
  teamId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  mediaType?: BattleRoyaleTeamMediaType;
  attachedToMediaId?: string | null;
}

export function AddMediaModal({
  teamId,
  isOpen,
  onClose,
  onSave,
  mediaType = 'note',
  attachedToMediaId = null,
}: AddMediaModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      type: mediaType,
      title: '',
      description: '',
      url: mediaType === 'link' ? '' : null,
      content: mediaType === 'note' || mediaType === 'sticky-note' || mediaType === 'comment' ? '' : null,
      attachedToMediaId: attachedToMediaId || null,
    },
  });

  const selectedType = watch('type');

  if (!isOpen) return null;

  const onSubmit = async (data: MediaFormData) => {
    setIsSaving(true);
    setError(null);

    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('You must be logged in to add media');
      }

      // For images, upload file first if provided
      let finalImageUrl = imageUrl;
      if (data.type === 'image' && imageFile && !imageUrl) {
        // Create media item first to get ID for storage path
        const tempMedia = await createBattleRoyaleTeamMedia({
          teamId,
          uploaderUserId: user.uid,
          type: 'image',
          title: data.title || 'Untitled Image',
          description: data.description || null,
          url: null,
          content: null,
          position: { x: 100, y: 100 },
          width: null,
          height: null,
          attachedToMediaId: null,
        });

        // Upload image
        finalImageUrl = await uploadMediaImage(teamId, tempMedia.id, imageFile);

        // Update media with URL
        await updateBattleRoyaleTeamMedia(tempMedia.id, {
          url: finalImageUrl,
          title: data.title,
          description: data.description || null,
        });

        reset();
        setImageUrl(null);
        setImageFile(null);
        onSave();
        onClose();
        return;
      }

      // For images, URL must be set
      if (data.type === 'image' && !finalImageUrl) {
        throw new Error('Please upload an image first');
      }

      // For links, URL is required
      if (data.type === 'link' && !data.url) {
        throw new Error('URL is required for links');
      }

      // For notes/sticky-notes/comments, content is required
      if (
        (data.type === 'note' || data.type === 'sticky-note' || data.type === 'comment') &&
        !data.content
      ) {
        throw new Error('Content is required');
      }

      // Create media item
      await createBattleRoyaleTeamMedia({
        teamId,
        uploaderUserId: user.uid,
        type: data.type,
        title: data.title,
        description: data.description || null,
        url: data.type === 'image' ? finalImageUrl : data.url || null,
        content: data.content || null,
        position: data.type === 'sticky-note' || data.type === 'comment' ? null : { x: 100, y: 100 },
        width: null,
        height: null,
        attachedToMediaId: data.attachedToMediaId || null,
      });

      reset();
      setImageUrl(null);
      setImageFile(null);
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add media');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (url: string) => {
    setImageUrl(url);
  };

  const handleImageFileSelect = (file: File) => {
    setImageFile(file);
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-card border border-surface-muted rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider mb-4">
          Add {selectedType === 'sticky-note' ? 'Sticky Note' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-surface-muted border border-neon-pink rounded-md">
            <p className="text-sm text-neon-pink">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-text-primary mb-1">
              Type
            </label>
            <select
              id="type"
              {...register('type')}
              className="input-neon w-full px-3 py-2 rounded-md"
            >
              <option value="image">Image</option>
              <option value="link">Link</option>
              <option value="note">Note</option>
              <option value="sticky-note">Sticky Note</option>
              <option value="comment">Comment</option>
            </select>
          </div>

          {selectedType === 'image' && (
            <div>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageFileSelect(file);
                  }
                }}
                className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neon-green file:text-text-dark hover:file:bg-neon-yellow file:cursor-pointer"
              />
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full max-h-64 rounded-lg object-contain border border-surface-muted"
                  />
                </div>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                Max 5MB. JPEG, PNG, WebP, or GIF. Image will be uploaded when you save.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1">
              Title <span className="text-neon-pink">*</span>
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.title && <p className="mt-1 text-sm text-neon-pink">{errors.title.message}</p>}
          </div>

          {(selectedType === 'link' || selectedType === 'image') && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-text-primary mb-1">
                {selectedType === 'link' ? 'URL' : 'URL (optional)'}
                {selectedType === 'link' && <span className="text-neon-pink">*</span>}
              </label>
              <input
                id="url"
                type="url"
                {...register('url')}
                className="input-neon w-full px-3 py-2 rounded-md"
                disabled={selectedType === 'image' && !!imageUrl}
              />
              {errors.url && <p className="mt-1 text-sm text-neon-pink">{errors.url.message}</p>}
            </div>
          )}

          {(selectedType === 'note' ||
            selectedType === 'sticky-note' ||
            selectedType === 'comment') && (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1">
                Content <span className="text-neon-pink">*</span>
              </label>
              <textarea
                id="content"
                {...register('content')}
                rows={4}
                className="input-neon w-full px-3 py-2 rounded-md resize-none"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-neon-pink">{errors.content.message}</p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={2}
              className="input-neon w-full px-3 py-2 rounded-md resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-neon-pink">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || (selectedType === 'image' && !imageFile)}
              className="flex-1 px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


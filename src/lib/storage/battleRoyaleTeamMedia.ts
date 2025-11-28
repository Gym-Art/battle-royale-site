import { getFirebaseStorage } from '@/lib/firebase/client';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Upload a media image for a team
 * @param teamId - The team ID
 * @param mediaId - The media item ID
 * @param file - The image file to upload
 * @returns The download URL of the uploaded image
 */
export async function uploadMediaImage(
  teamId: string,
  mediaId: string,
  file: File
): Promise<string> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.`);
  }

  const storage = getFirebaseStorage();
  const storageRef = ref(storage, `battleRoyaleTeams/${teamId}/media/${mediaId}.jpg`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Delete a media image
 * @param teamId - The team ID
 * @param mediaId - The media item ID
 */
export async function deleteMediaImage(teamId: string, mediaId: string): Promise<void> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, `battleRoyaleTeams/${teamId}/media/${mediaId}.jpg`);
  await deleteObject(storageRef);
}


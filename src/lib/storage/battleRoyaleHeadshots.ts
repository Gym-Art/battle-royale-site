import { getFirebaseStorage } from '@/lib/firebase/client';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Upload a headshot image for a team member
 * @param teamId - The team ID
 * @param memberId - The member ID
 * @param file - The image file to upload
 * @returns The download URL of the uploaded image
 */
export async function uploadHeadshot(
  teamId: string,
  memberId: string,
  file: File
): Promise<string> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.`);
  }

  const storage = getFirebaseStorage();
  const storageRef = ref(storage, `battleRoyaleTeams/${teamId}/headshots/${memberId}.jpg`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Delete a headshot image
 * @param teamId - The team ID
 * @param memberId - The member ID
 */
export async function deleteHeadshot(teamId: string, memberId: string): Promise<void> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, `battleRoyaleTeams/${teamId}/headshots/${memberId}.jpg`);
  await deleteObject(storageRef);
}

/**
 * Resize and crop image to square aspect ratio (1:1)
 * This is a simple client-side implementation using canvas
 * @param file - The image file to process
 * @param size - The output size (default: 400x400)
 * @returns A new File with square aspect ratio
 */
export async function processHeadshotImage(
  file: File,
  size: number = 400
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate crop dimensions to center the image
        const minDimension = Math.min(img.width, img.height);
        const sourceX = (img.width - minDimension) / 2;
        const sourceY = (img.height - minDimension) / 2;

        // Draw the cropped and resized image
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          minDimension,
          minDimension,
          0,
          0,
          size,
          size
        );

        // Convert to blob and create new file
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create image blob'));
              return;
            }
            const processedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(processedFile);
          },
          'image/jpeg',
          0.9
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}


import { toast } from 'sonner@2.0.3';
import { supabase, IMAGE_BUCKET } from '../lib/supabase';

/**
 * Uploads an image to Supabase Storage and hands back its public URL.
 * The URL (not the image itself) is what gets saved with the content, so
 * pages stay small and images load from a CDN.
 */
export const handleFileUpload = async (
  file: File,
  callback: (url: string) => void,
  maxSizeMB: number = 5
) => {
  if (!file.type.startsWith('image/')) {
    toast.error('Choose an image file (JPG, PNG or WebP).');
    return;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`Images must be smaller than ${maxSizeMB}MB. Resize it and try again.`);
    return;
  }

  const extension = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
  const toastId = toast.loading('Uploading image…');

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error('Image upload failed:', error);
    const notAllowed = /row-level security|not authorized|unauthorized|403/i.test(error.message);
    toast.error(
      notAllowed
        ? 'Your account is not allowed to upload images. Sign out and sign in again.'
        : `Image upload failed: ${error.message}`,
      { id: toastId }
    );
    return;
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  toast.success('Image uploaded. Remember to save.', { id: toastId });
  callback(data.publicUrl);
};

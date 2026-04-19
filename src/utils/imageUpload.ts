import { toast } from 'sonner@2.0.3';

export const handleFileUpload = (
  file: File,
  callback: (dataUrl: string) => void,
  maxSizeMB: number = 5
) => {
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`Image size should be less than ${maxSizeMB}MB`);
    return;
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    toast.error('Please upload an image file');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result as string);
  };
  reader.onerror = () => {
    toast.error('Failed to read image file');
  };
  reader.readAsDataURL(file);
};

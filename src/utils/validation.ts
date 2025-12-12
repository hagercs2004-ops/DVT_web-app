export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateFilename = (filename: string): boolean => {
  return filename.trim().length > 0 && filename.length <= 255;
};

export const validateDocumentName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 100;
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

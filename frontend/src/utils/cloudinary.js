export const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const getImageUrl = (publicId, options = {}) => {
  const { width = "auto", quality = "auto", format = "auto" } = options;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`;
};

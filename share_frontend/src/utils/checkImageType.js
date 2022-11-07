export const checkImageType = (type) => {
  if (
    type === "image/png" ||
    type === "image/svg" ||
    type === "image/jpeg" ||
    type === "image/gif" ||
    type === "image/jpg" ||
    type === "image/tiff"
  ) {
    return true;
  }

  return false;
};

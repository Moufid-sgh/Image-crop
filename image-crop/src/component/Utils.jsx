const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = (imageSrc, crop, zoom) => {
  const canvas = document.createElement('canvas');
  const scaleX = imageSrc.naturalWidth / imageSrc.width;
  const scaleY = imageSrc.naturalHeight / imageSrc.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    imageSrc,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Erreur lors de la création de l'image recadrée."));
        return;
      }
      resolve(blob);
    }, "image/jpeg", 0.9);
  });
};

export default async function getCroppedImage(imageSrc, crop, zoom) {
  const image = await createImage(imageSrc);
  return getCroppedImg(image, crop, zoom);
}



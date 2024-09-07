import { SizeType } from '../types';

export async function handleFileUploadOptimisation(file: File): Promise<File | undefined> {
  const url = URL.createObjectURL(file);
  const imageElement = new Image();
  imageElement.src = url;

  await new Promise((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });

  try {
    const formatedImage = await OptimiseImage(imageElement, { width: 1080, height: 720 }, file.name);
    URL.revokeObjectURL(url);

    return formatedImage;
  } catch (error) {
    console.error("Erreur lors du formatage de l'image :", error);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function OptimiseImage(
  rawImage: HTMLImageElement | HTMLCanvasElement,
  { width, height }: SizeType,
  name: string
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // find the right target width and height based on the original image ratio
    const originalRatio = rawImage.width / rawImage.height;
    const targetRatio = width / height;

    let targetWidth = width;
    let targetHeight = height;

    if (originalRatio > targetRatio) {
      targetHeight = width / originalRatio;
    } else {
      targetWidth = height * originalRatio;
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx?.drawImage(rawImage, 0, 0, targetWidth, targetHeight);

    canvas.toBlob((blob) => {
      if (blob) {
        // Créer un objet File à partir du Blob
        const imageFile = new File([blob], name, { type: 'image/webp' });

        resolve(imageFile);
      } else {
        reject(new Error('La conversion a échoué'));
      }
    }, 'image/webp');
  });
}

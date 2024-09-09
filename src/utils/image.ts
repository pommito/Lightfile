import { SizeType } from '../types';
import { isSafari } from './checkUserBrowser';

export async function handleFileUploadOptimisation(file: File): Promise<File | undefined> {
  const url = URL.createObjectURL(file);
  const imageElement = new Image();
  imageElement.src = url;

  await new Promise((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });

  try {
    const formatedImage = await OptimiseImage(imageElement, { width: 1280, height: 720 }, file.name);
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

    if (!ctx) {
      reject(new Error('Impossible de récupérer le contexte 2D du canvas'));
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const originalRatio = rawImage.width / rawImage.height;
    const targetRatio = width / height;

    let targetWidth, targetHeight;

    if (originalRatio > targetRatio) {
      targetWidth = width;
      targetHeight = Math.round(width / originalRatio);
    } else {
      targetHeight = height;
      targetWidth = Math.round(height * originalRatio);
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.drawImage(rawImage, 0, 0, targetWidth, targetHeight);

    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const isEmpty = imageData.data.every((pixel) => pixel === 0);

    if (isEmpty) {
      reject(new Error("L'image n'a pas été correctement dessinée sur le canvas"));
      return;
    }

    const isSafariBrowser = isSafari();
    const outputFormat = isSafariBrowser ? 'image/jpeg' : 'image/webp';
    const fileExtension = isSafariBrowser ? '.jpg' : '.webp';

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const fileName = name.replace(/\.[^/.]+$/, '') + fileExtension;
          const imageFile = new File([blob], fileName, { type: outputFormat });
          resolve(imageFile);
        } else {
          reject(new Error('La conversion a échoué'));
        }
      },
      outputFormat,
      0.9
    );
  });
}

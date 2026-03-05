'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
  apiUrl: 'https://api.uploadthing.com',
});

export async function deleteUploadThingFiles(hostedImage: string) {
  if (!hostedImage) {
    return { success: false, message: 'No image URL provided' };
  }

  const fileKey = hostedImage.split('/f/')[1]
    ? hostedImage.split('/f/')[1]
    : null;

  if (!fileKey) {
    return { success: false, message: 'Invalid UploadThing URL' };
  }

  try {
    await utapi.deleteFiles(fileKey);

    updateTag('products');
    updateTag('featured-products');
    revalidatePath('/admin/products');

    return { success: true, message: 'Image deleted' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

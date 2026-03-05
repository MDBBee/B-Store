import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from '@uploadthing/react';

import { type OurFileRouter } from '@/app/api/uploadthing/core';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { uploadFiles } = generateReactHelpers<OurFileRouter>();

// Generate the helpers for your file router
export const uploadSelectedImages = async (files: File[]) => {
  if (files.length === 0) return;

  try {
    // Prevent duplicate Image upload
    const fileNames = new Set<string>();
    for (const file of files) {
      if (fileNames.has(file.name)) {
        throw new Error(`Duplicate Image file. Name: ${file.name}`);
      }
      fileNames.add(file.name);
    }

    // Upload to UploadThing programmatically
    const uploaded = await uploadFiles('imageUploader', {
      files: [...files],
    }); // endpoint name

    const uploadedUrls = uploaded.map((res) => res.url);

    return uploadedUrls;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));

    throw err;
  }
};

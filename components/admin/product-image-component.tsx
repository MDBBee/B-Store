'use client';

import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Dispatch, SetStateAction } from 'react';
import { toast } from '@/hooks/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';
import { deleteUploadThingFiles } from '@/lib/uploadthing-server';
import DeleteImageDialogue from '@/components/admin/delete-image-dialogue';

export type ImageObject = {
  id: string;
  file: File | null;
  urlBlob: string;
};

const ProductImageComponent = ({
  imageFile,
  setImageFile,
  form,
  type,
  updateProductImageFile,
  setUpdateProductImageFile,
}: {
  imageFile: ImageObject[];
  updateProductImageFile: ImageObject[];
  setImageFile: Dispatch<SetStateAction<ImageObject[]>>;
  setUpdateProductImageFile: Dispatch<SetStateAction<ImageObject[]>>;
  form: UseFormReturn<
    {
      name: string;
      slug: string;
      category: string;
      brand: string;
      description: string;
      stock: number;
      images: string[];
      isFeatured: boolean;
      banner: { urlBlob: string; file: File | null; id: string } | null;
      price: string;
    },
    undefined
  >;
  type: string;
}) => {
  return (
    <div>
      <Card>
        <CardContent className="space-y-2 mt-2 min-h-48">
          <div className="flex flex-col md:flex-row md:justify-start md:items-center md:w-[100%] w-full gap-2 ">
            {type === 'Update'
              ? updateProductImageFile.map((img, idx) => (
                  <div
                    key={`${img.urlBlob}-${idx}`}
                    className="relative rounded-lg border-border border-2  h-40 w-full md:w-40 md:h-40"
                  >
                    <div className="flex justify-center items-center rounded-full size-5 md:size-7 border-2 border-border absolute -top-2 right-0 z-50 cursor-pointer hover:scale-125 bg-background text-destructive duration-200">
                      <DeleteImageDialogue
                        imgUrls={img.urlBlob}
                        action={deleteUploadThingFiles}
                        setUpdateProductImageFile={setUpdateProductImageFile}
                        form={form}
                      />
                    </div>
                    <Image
                      src={img.urlBlob}
                      alt="product image"
                      className=" object-cover object-center rounded-sm h-40 w-full md:w-40 md:h-40"
                      width={170}
                      height={170}
                    />
                  </div>
                ))
              : imageFile.map((imgObj, idx) => (
                  <div
                    key={`${imgObj.id}-${idx}`}
                    className="relative rounded-lg border-border border-2  h-40 w-full md:w-40 md:h-40"
                  >
                    <span
                      onClick={() => {
                        setImageFile((prev) =>
                          prev.filter((urlBlob) => urlBlob.id !== imgObj.id),
                        );
                      }}
                      className="flex justify-center items-center rounded-full size-5 md:size-7 border-2 border-border absolute top-0 right-0 z-50 cursor-pointer hover:scale-125 hover:bg-foreground text-destructive duration-200"
                    >
                      <X />
                    </span>
                    <Image
                      src={imgObj.urlBlob}
                      alt="product image"
                      className=" object-cover object-center rounded-sm "
                      fill
                    />
                  </div>
                ))}
            <input
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;

                if (!files) return;

                try {
                  const newFiles = Array.from(files);
                  // console.log('newFiles', newFiles);
                  const prevFiles = newFiles.map((file) => ({
                    urlBlob: URL.createObjectURL(file),
                    file: file,
                    id: file.lastModified + '-' + file.name,
                  }));
                  const prevImages = newFiles.map((file) =>
                    URL.createObjectURL(file),
                  );

                  //   console.log('prevUrls', prevFiles);
                  //   return;

                  if (type === 'Update') {
                    if (prevFiles.length + updateProductImageFile.length > 2) {
                      form.setError('images', {
                        type: 'manual',
                        message: 'Max number of images: 2; Total size: 2MB',
                      });
                      throw new Error(
                        'Max number of images: 2; Total size: 2MB',
                      );
                    }
                    setUpdateProductImageFile((prev) => [
                      ...prev,
                      ...prevFiles,
                    ]);

                    // console.log('PIC-138', prevFiles, updateProductImageFile);
                    form.setValue('images', [
                      ...prevFiles.map((f) => f.urlBlob),
                      ...updateProductImageFile.map((f) => f.urlBlob),
                    ]);
                    return;
                  }

                  if (prevFiles.length + imageFile.length > 2) {
                    form.setError('images', {
                      type: 'manual',
                      message: 'Max number of images: 2; Total size: 2MB',
                    });
                    throw new Error('Max number of images: 2; Total size: 2MB');
                  }

                  setImageFile((prev) => [...prev, ...prevFiles]);

                  // Not too relevant, file will be overwritten
                  form.setValue('images', [...prevImages]);
                } catch (error) {
                  if (error instanceof Error) {
                    toast({
                      variant: 'destructive',
                      description: error.message,
                    });
                    return;
                  }
                  throw error;
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProductImageComponent;

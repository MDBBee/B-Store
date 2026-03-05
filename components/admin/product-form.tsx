'use client';

import { useToast } from '@/hooks/use-toast';
import { PRODUCT_CATEGORIES, productDefaultValues } from '@/lib/constants';
import {
  insertProductFormSchema,
  updateProductFormSchema,
} from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createProduct, updateProduct } from '@/lib/actions/product.action';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { uploadSelectedImages } from '@/lib/uploadthing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import { formatError } from '@/lib/utils';
import ProductImageComponent, { ImageObject } from './product-image-component';
import DeleteImageDialogue from './delete-image-dialogue';
import { deleteUploadThingFiles } from '@/lib/uploadthing-server';

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  // For image-preview and final image upload
  const [imageFile, setImageFile] = useState<ImageObject[]>([]);
  const [updateProductImageFile, setUpdateProductImageFile] = useState<
    ImageObject[]
  >([]);

  let productUpdateDefault = { ...product, banner: null } as z.infer<
    typeof updateProductFormSchema
  >;
  if (product?.banner) {
    productUpdateDefault = {
      ...product,
      banner: { file: null, id: product.banner, urlBlob: product.banner },
    };
  }

  const form = useForm<z.infer<typeof insertProductFormSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductFormSchema)
        : zodResolver(insertProductFormSchema),
    defaultValues:
      product && type === 'Update'
        ? {
            ...productUpdateDefault,
          }
        : productDefaultValues,
  });

  //

  useEffect(() => {
    if (type !== 'Update') return;
    const existingImages = form.getValues('images');

    const imageFile: ImageObject[] = existingImages.map((url) => {
      const imgfileObj = { id: url, file: null, urlBlob: url };
      return imgfileObj;
    });

    setUpdateProductImageFile([...imageFile]);
  }, [form, type]);

  const onSubmit: SubmitHandler<
    z.infer<typeof insertProductFormSchema>
  > = async (values) => {
    try {
      // On Create
      if (type === 'Create') {
        let imageFiles = imageFile.map((imgObj) => {
          if (!imgObj.file) return;
          return imgObj.file;
        }) as File[];
        const bannerImageFile = values.banner;
        if (bannerImageFile) {
          imageFiles = [...imageFiles, bannerImageFile.file];
        }

        const processedImgUrls = (await uploadSelectedImages(
          imageFiles,
        )) as string[];
        const banner = processedImgUrls.pop() ?? null;
        const images = processedImgUrls;

        const updatedValues = {
          ...values,
          images,
          banner,
        };
        const res = await createProduct(updatedValues);

        if (!res.success) {
          toast({
            variant: 'destructive',
            description: res.message,
          });
        } else {
          toast({
            description: res.message,
          });
          router.push('/admin/products');
        }
      }

      // On Update
      if (type === 'Update') {
        if (!productId) {
          router.push('/admin/products');
          return;
        }

        // Images
        const unhostedImageFiles = [
          ...updateProductImageFile
            .filter((imgObj) => imgObj.file !== null)
            .map((imgObj) => imgObj.file),
        ];

        const hostedImageUrls = updateProductImageFile
          .filter((imgObj) => imgObj.file === null)
          .map((imgObj) => imgObj.urlBlob) as string[] | [];

        // Banner image
        let hostedBanner;
        let unHostedBanner;
        if (values.banner && values.banner.file) {
          // Unhosted banner
          unHostedBanner = values.banner.file;
        } else if (values.banner && !values.banner.file) {
          // Hosted banner
          hostedBanner = values.banner.urlBlob;
        }

        let res: {
          success: boolean;
          message: string;
        } = { success: false, message: '' };

        if (unhostedImageFiles.length === 0 && !unHostedBanner) {
          res = await updateProduct({
            ...values,
            id: productId,
            banner: (hostedBanner as string) ?? null,
          });
        } else {
          const hostUpdateImg = (await uploadSelectedImages([
            ...(unhostedImageFiles as File[]),
            ...(unHostedBanner ? ([unHostedBanner] as File[]) : []),
          ])) as string[];

          const newBanner = hostUpdateImg?.pop();
          const newHostedImages = [
            ...hostedImageUrls,
            ...(hostUpdateImg as string[]),
          ];

          const newValues = {
            ...values,
            id: productId,
            images: newHostedImages,
            banner: newBanner as string,
          };

          res = await updateProduct({
            ...newValues,
          });

          if (res.success) {
            const updatedImages = [
              ...hostedImageUrls,
              ...(hostUpdateImg as string[]),
            ];

            form.setValue('images', updatedImages);
          }
        }

        if (!res.success) {
          toast({
            variant: 'destructive',
            description: res.message,
          });
        } else {
          toast({
            description: res.message,
          });
          router.push('/admin/products');
        }
      }
    } catch (error) {
      const errMess = formatError(error);
      toast({
        variant: 'destructive',
        description: errMess,
      });

      return;
    }
  };

  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'name'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'slug'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('name'), { lower: true }),
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'brand'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'price'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'stock'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Enter stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({}) => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* Image component*/}
                  <ProductImageComponent
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    setUpdateProductImageFile={setUpdateProductImageFile}
                    form={form}
                    type={type}
                    updateProductImageFile={updateProductImageFile}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field">
          {/* isFeatured */}
          Featured Product
          <Card>
            <CardContent className="space-y-2 mt-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="space-x-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <div className="relative ">
                  <div className="flex justify-center items-center rounded-full size-5 md:size-7 border-2 border-border absolute -top-2 right-0 z-50 cursor-pointer hover:scale-125 bg-background text-destructive duration-200">
                    <DeleteImageDialogue
                      imgUrls={banner.urlBlob}
                      action={deleteUploadThingFiles}
                      form={form}
                    />
                  </div>
                  <Image
                    src={banner.urlBlob}
                    alt="banner image"
                    className="w-full object-cover object-center rounded-sm"
                    width={1920}
                    height={680}
                  />
                </div>
              )}

              {isFeatured && !banner && (
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const imageBlob = URL.createObjectURL(file as File);

                    form.setValue('banner', {
                      file,
                      id: file.lastModified + '-' + file.name,
                      urlBlob: imageBlob,
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductFormSchema>,
                'description'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    placeholder="Enter product description"
                    className="w-full rounded-md border px-3 py-2 bg-background"
                    minRows={3} // initial height
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;

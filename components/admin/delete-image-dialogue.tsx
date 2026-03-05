'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ImageObject } from './product-image-component';
import { UseFormReturn } from 'react-hook-form';

const DeleteImageDialogue = ({
  imgUrls,
  action,
  setUpdateProductImageFile,
  form,
}: {
  imgUrls: string;
  action: (imgUrls: string) => Promise<{ success: boolean; message: string }>;
  setUpdateProductImageFile?: Dispatch<SetStateAction<ImageObject[]>>;
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
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(imgUrls);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        setOpen(false);
        if (setUpdateProductImageFile) {
          setUpdateProductImageFile((prev) => {
            return prev.filter((f) => f.urlBlob !== imgUrls);
          });
          const existingImages = form.getValues('images');
          form.setValue('images', [
            ...existingImages.filter((f) => f !== imgUrls),
          ]);
        } else {
          form.setValue('banner', null);
        }
        toast({
          description: res.message,
        });
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <X />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone, this image will be deleted
            permanently!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteImageDialogue;

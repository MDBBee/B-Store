'use client';

import { CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast({ variant: 'destructive', description: res.message });
      return;
    }
    toast({
      description: `${res.message} `,
      action: (
        <ToastAction
          className="bg-primary text-secondary hover:bg-gray-800 hover:text-white"
          altText="Go to Cart"
          onClick={() => router.push('/cart')}
        >
          Go To Cart
        </ToastAction>
      ),
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      + AddToCart
    </Button>
  );
};
export default AddToCart;

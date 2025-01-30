'use client';

import { Cart, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Plus, Minus } from 'lucide-react';

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
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

  // Handle remove from Cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message,
    });

    return;
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> AddToCart
    </Button>
  );
};
export default AddToCart;

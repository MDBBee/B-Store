'use client';

import { ArrowRight, LoaderPinwheel, Minus, Plus } from 'lucide-react';
import { Cart } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from '@/lib/actions/cart.actions';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatNumberWithDecimal } from '@/lib/utils';
import { BreadCrumb } from '@/components/shared/breadcrumb';

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <BreadCrumb />
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <Link href="/search" className="text-accent underline">
            Go Shopping
          </Link>{' '}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          {/* Left component- Table */}
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-left">Unit Price</TableHead>
                  <TableHead className="text-left">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <div className="flex items-center">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-10 w-10"
                          />
                        </Link>
                        <span className="hidden lg:block px-2">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId,
                            );

                            if (!res.success) {
                              toast({
                                variant: 'destructive',
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <LoaderPinwheel className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);

                            if (!res.success) {
                              toast({
                                variant: 'destructive',
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <LoaderPinwheel className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        className="hover:bg-destructive"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await deleteItemFromCart(
                              item.productId,
                            );

                            if (!res.success) {
                              toast({
                                variant: 'destructive',
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        Remove Item
                      </Button>
                    </TableCell>
                    <TableCell className="text-left ">
                      €{formatNumberWithDecimal(Number(item.price))}
                    </TableCell>
                    <TableCell className="text-left ">
                      €{(Number(item.price) * item.qty).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Right component- Card */}
          <Card className="min-h-[50%]">
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal (
                {cart.items.reduce((acc, cur) => {
                  return acc + cur.qty;
                }, 0)}
                ):{' '}
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push('/shipping-address'))
                }
              >
                <ArrowRight className="w-4 h-4" />
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
export default CartTable;

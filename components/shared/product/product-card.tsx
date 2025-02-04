import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './product-price';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm rounded-md hover:-translate-y-2 hover:shadow-accent duration-500">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <div className="h-[300px] overflow-hidden">
            <Image
              className="h-[300px] object-cover rounded-md hover:h-[400px] duration-500"
              src={product.images[0]}
              alt={product.name}
              height={300}
              width={300}
              priority={true}
            />
          </div>
        </Link>
        <CardTitle className="h-auto">
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-lg font-medium">{product.name}</h2>
          </Link>
        </CardTitle>
        <CardDescription className="h-auto">
          <div className="text-xs">{product.brand}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="flex-between gap-4">
          <p>{product.rating} Stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;

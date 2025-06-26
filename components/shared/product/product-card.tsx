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
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  const imgSrc = product.images[0].trim();

  return (
    <Card className="w-full max-w-sm rounded-md hover:-translate-y-2 hover:shadow-accent hover:shadow-lg duration-200 ">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <div className="h-[300px] group overflow-hidden">
            <Image
              className="h-[300px] w-[300px] object-cover rounded-md group-hover:scale-110 duration-500"
              src={imgSrc}
              alt={product.name}
              height={300}
              width={300}
              priority={true}
            />
          </div>
        </Link>
        <CardTitle className="h-auto rounded-md">
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
          <Rating value={Number(product.rating)} />
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

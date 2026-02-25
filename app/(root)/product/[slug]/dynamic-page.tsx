import { auth } from '@/auth';
import AddToCart from '@/components/shared/product/add-to-cart';
import ProductImages from '@/components/shared/product/product-images';
import ProductPrice from '@/components/shared/product/product-price';
import Rating from '@/components/shared/product/rating';
import { Card, CardContent } from '@/components/ui/card';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getProductBySlug } from '@/lib/actions/product.action';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import ReviewList from './review-list';

const DynamicProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user.id;

  const cart = await getMyCart();

  let description = product.description;
  let specs: string[] = [];

  if (product.description.includes('product-spec')) {
    const parts = product.description.split('product-spec');
    description = parts[0];
    specs = parts[1]?.split('--') ?? [];
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 mt-2">
          {/* Images */}
          <div className="col-span-2 h-[500px]">
            <ProductImages images={product.images} />
          </div>
          {/* Descriptio */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <Rating value={Number(product.rating)} />
              <p>
                {product.numReviews}{' '}
                {product.numReviews > 1 ? 'reviews' : 'review'}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
              <div className="mt-10">
                <p className="font-semibold">Description</p>
                <p>{description}</p>
                <div className="space-y-2">
                  {specs.map((s) => (
                    <Badge key={s}>
                      <p>{s}</p>
                    </Badge>
                  ))}
                  {/* <p>{product.description}</p> */}
                </div>
              </div>
            </div>
            {/* Action col */}
          </div>
          {/* Price Info */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-black"
                    >
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className="">
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="h2-bold">Customer Reviews</h2>
        <ReviewList
          userId={userId || ''}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};
export default DynamicProductPage;

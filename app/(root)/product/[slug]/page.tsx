import { getAllProducts } from '@/lib/actions/product.action';
import { BreadCrumb } from '@/components/shared/breadcrumb';
import { Suspense } from 'react';
import DynamicProductPage from './dynamic-page';
import ProductSkeleton from './product-skeleton';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <>
      <BreadCrumb />
      <Suspense fallback={<ProductSkeleton />}>
        <DynamicProductPage params={props.params} />
      </Suspense>
    </>
  );
};

export default ProductDetailsPage;

export async function generateStaticParams() {
  // We fetch a limited amount to keep the build stable while we debug
  const products = await getAllProducts({
    query: 'all',
    limit: 100, // Just do 100 for now to test the build
    page: 1,
  });

  // Next.js expects: [{ slug: 'camera' }, { slug: 'phone' }]
  return products.data.map((product) => ({
    slug: product.slug,
  }));
}

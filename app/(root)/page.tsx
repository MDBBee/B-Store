import DealCountdown from '@/components/deal-countdown';
import IconBoxes from '@/components/icon-boxes';
import LoadingProductCards from '@/components/loading-cards/loading-product-cards';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
import { Suspense } from 'react';

export const metadata = {
  title: 'Home',
};

const Homepage = async () => {
  return (
    <>
      <ProductCarousel />
      <Suspense fallback={<LoadingProductCards />}>
        <ProductList title="Newest Arrivals" limit={4} />
      </Suspense>
      <ViewAllProductsButton />
      <IconBoxes />
      <DealCountdown />
    </>
  );
};

export default Homepage;

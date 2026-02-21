export const dynamic = 'force-static';

import DealCountdown from '@/components/deal-countdown';
import IconBoxes from '@/components/icon-boxes';
import LoadingCardCarousel from '@/components/loading-cards/loading-card-carousel';
import LoadingCardsHomePage from '@/components/loading-cards/loading-product-cards';
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
      <Suspense fallback={<LoadingCardCarousel />}>
        <ProductCarousel />
      </Suspense>
      <Suspense fallback={<LoadingCardsHomePage />}>
        <ProductList title="Newest Arrivals" limit={4} />
      </Suspense>
      <ViewAllProductsButton />
      <IconBoxes />
      <DealCountdown />
    </>
  );
};

export default Homepage;

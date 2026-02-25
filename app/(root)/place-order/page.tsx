import { Metadata } from 'next';
import { BreadCrumb } from '@/components/shared/breadcrumb';
import { Suspense } from 'react';
import DPlaceOrderPage from './d-place-order-page';

export const metadata: Metadata = {
  title: 'Place Order',
};

const PlaceOrderPage = () => {
  return (
    <>
      <BreadCrumb current={3} />
      <h1 className="py-4 text-2xl">Place Order</h1>
      <Suspense fallback={'Loading...'}>
        <DPlaceOrderPage />
      </Suspense>
    </>
  );
};

export default PlaceOrderPage;

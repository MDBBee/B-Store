import { Metadata } from 'next';
import { BreadCrumb } from '@/components/shared/breadcrumb';
import DShippingPage from './d-shipping-page';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shipping Adress',
};

const ShippingAddressPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  return (
    <>
      <BreadCrumb current={1} />
      <Suspense fallback={'Loading..'}>
        <DShippingPage searchParams={searchParams} />
      </Suspense>
    </>
  );
};
export default ShippingAddressPage;

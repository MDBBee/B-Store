import { Metadata } from 'next';
import { Suspense } from 'react';
import DUserOrdersPage from './d-user-orders-page';

export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <Suspense fallback={'Loading..'}>
        <DUserOrdersPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default OrdersPage;

import { Metadata } from 'next';
import DynamicOrderPage from './dynamic-order-page';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <DynamicOrderPage params={props.params} />
      </Suspense>
    </>
  );
};

export default OrderDetailsPage;

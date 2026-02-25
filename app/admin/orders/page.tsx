import { Metadata } from 'next';
import DynamicAdminOrdersPage from './dynamic-admin-orders-page';
import { Suspense } from 'react';
import DLoadingPage from '../d-loading';

export const metadata: Metadata = {
  title: 'Admin Orders',
};

const AdminOrdersPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Orders</h1>
      <Suspense fallback={<DLoadingPage />}>
        <DynamicAdminOrdersPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AdminOrdersPage;

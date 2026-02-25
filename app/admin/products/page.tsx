import { Suspense } from 'react';
import DAdminProductsPage from './d-admin-products-page';
import DLoadingPage from '../d-loading';

const AdminProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  return (
    <Suspense fallback={<DLoadingPage />}>
      <DAdminProductsPage searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminProductsPage;

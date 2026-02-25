import { Metadata } from 'next';
import DAdminProductsIdPage from './d-admin-products-id-page';
import { Suspense } from 'react';
import DLoadingPage from '../../d-loading';

export const metadata: Metadata = {
  title: 'Update Product',
};

const AdminProductUpdatePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Product</h1>
      <Suspense fallback={<DLoadingPage />}>
        <DAdminProductsIdPage params={params} />
      </Suspense>
    </div>
  );
};

export default AdminProductUpdatePage;

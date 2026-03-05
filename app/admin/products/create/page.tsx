import { Metadata } from 'next';
import ProductForm from '@/components/admin/product-form';
import { Suspense } from 'react';
import DLoadingPage from '../../d-loading';

export const metadata: Metadata = {
  title: 'Create Product',
};

const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <Suspense fallback={<DLoadingPage />}>
          <ProductForm type="Create" />
        </Suspense>
      </div>
    </>
  );
};

export default CreateProductPage;

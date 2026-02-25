import { Metadata } from 'next';
import { BreadCrumb } from '@/components/shared/breadcrumb';
import DPaymentPage from './d-payment-page';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Select Payment Method',
};

const PaymentMethodPage = async () => {
  return (
    <>
      <BreadCrumb current={2} />
      <Suspense fallback={'Loading...'}>
        <DPaymentPage />
      </Suspense>
    </>
  );
};

export default PaymentMethodPage;

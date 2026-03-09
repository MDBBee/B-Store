import { Suspense } from 'react';
import DynamicSPSPage from './dynamic-sps-page';

const SuccessPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  return (
    <Suspense fallback={'Loading..'}>
      <DynamicSPSPage params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default SuccessPage;

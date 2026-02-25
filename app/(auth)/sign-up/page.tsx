import { Suspense } from 'react';
import DynamicSignUpPage from './dynamic-sign-up-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <DynamicSignUpPage searchParams={searchParams} />
      </Suspense>
    </>
  );
};
export default SignUpPage;

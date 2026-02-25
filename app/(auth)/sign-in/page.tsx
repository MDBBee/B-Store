import { Metadata } from 'next';
import DynamicSignInPage from './dynamic-page';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-2">
      <Suspense fallback={'Loading...'}>
        <DynamicSignInPage searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
};
export default SignInPage;

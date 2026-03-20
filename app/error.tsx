'use client';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { formatError } from '@/lib/utils';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    Sentry.captureException(error, {
      extra: { formattedError: formatError(error) },
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-destructive">Requested page is unavailable</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = '/')}
        >
          Return to Home Page
        </Button>
      </div>
    </div>
  );
};
export default ErrorPage;

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized page',
};

const UnauthorizedPage = () => {
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
        <h1 className="text-3xl font-bold mb-4">Unauthorized access</h1>
        <p className="text-destructive text-4xl">
          Requested page for ADMINS only!!{' '}
        </p>
        <Button variant="outline" className="mt-4 ml-2" asChild>
          <Link href={'/'}>Return to Home Page</Link>
        </Button>
      </div>
    </div>
  );
};
export default UnauthorizedPage;

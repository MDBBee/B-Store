import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import AdminSearch from '@/components/admin/admin-search';
import adminRequired from '@/lib/admin-required';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function AdminRequired() {
  await adminRequired();
  return <h2 className="hidden">Admin Check</h2>;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={'Admin Check...'}>
        <AdminRequired />
      </Suspense>
      <div className="flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex items-center h-16 px-4">
            <Link href="/" className="w-22">
              <Image
                src="/images/logo.svg"
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            <Suspense fallback={null}>
              <MainNav className="mx-6 hidden md:block" />
            </Suspense>
            <div className="flex items-center  ml-auto space-x-4 ">
              <div className="hidden md:block">
                <Suspense fallback={<Skeleton className="w-full h-12" />}>
                  <AdminSearch />
                </Suspense>
              </div>
              <Suspense fallback={<Skeleton className="w-16 h-8" />}>
                <Menu />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Mobile view */}
        <Suspense fallback={null}>
          <MainNav className="mx-auto block md:hidden mt-4" />
        </Suspense>

        <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}

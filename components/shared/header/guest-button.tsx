'use client';

import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const GuestButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const fullUrl =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
  const encodedUrl = encodeURIComponent(fullUrl);

  return (
    <Button
      className="w-full"
      onClick={() => router.push(`/sign-in?callbackUrl=${encodedUrl}`)}
    >
      <UserIcon /> sign-in
    </Button>
  );
};
export default GuestButton;

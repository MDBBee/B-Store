'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, FanIcon } from 'lucide-react';
import { useTransition } from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
};

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isTransitionComplete, startTransition] = useTransition();

  const handleClick = (btnType: string) => {
    startTransition(() => {
      const pageValue =
        btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
      const params = new URLSearchParams(searchParams);
      params.set('page', String(pageValue));

      router.push(`${pathname}?${String(params)}`);
    });
  };

  return (
    <div className="flex gap-2 justify-end mt-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => handleClick('prev')}
      >
        <ArrowLeft />{' '}
        {isTransitionComplete ? (
          <FanIcon className="animate-spin" />
        ) : (
          'Previous'
        )}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick('next')}
      >
        {isTransitionComplete ? <FanIcon className="animate-spin" /> : 'Next'}{' '}
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;

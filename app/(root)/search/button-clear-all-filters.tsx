'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ButtonClearFilters = () => {
  return (
    <Button variant="default" asChild>
      <Link href="/search">Clear all Filters</Link>
    </Button>
  );
};
export default ButtonClearFilters;

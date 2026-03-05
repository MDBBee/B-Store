'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes('/admin/orders')
    ? { path: '/admin/orders', name: "search by buyer's name" }
    : pathname.includes('/admin/users')
      ? { path: '/admin/users', name: 'search by username' }
      : pathname.includes('/admin/products')
        ? { path: '/admin/products', name: "search by product's name" }
        : { path: '/admin/products', name: 'search....' };

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <form action={formActionUrl.path} method="GET">
      <Input
        type="search"
        placeholder={formActionUrl.name}
        name="query"
        autoComplete="off"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px] lg:focus:w-[400px] md:focus:w-[150px] duration-200"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;

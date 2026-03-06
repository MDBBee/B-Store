import ProductCard from '@/components/shared/product/product-card';
import { getAllProducts } from '@/lib/actions/product.action';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

import AnimateFilter from './animate-filter';
import { Suspense } from 'react';
import Filter from './filter';
import FilterForm from './filter-form';
import { Card } from '@/components/ui/card';
import Pagination from '@/components/shared/product/pagination';

const sortProductsBy = ['newest', 'lowest', 'highest', 'rating'];

const DSearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const resolvedPromise = await searchParams;
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = resolvedPromise;

  // Filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    // console.log('✅✅✅...', params);

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      {/* S/Mobile-screen filter */}
      <div className="block md:hidden w-full">
        <p className="">FILTER PRODUCTS</p>
        <Filter searchUrlItems={resolvedPromise} />
      </div>
      {/* L-screen filter */}
      <div className="hidden md:block">
        <p className="mt-5 mb-3 text-center font-bold">Filter Search</p>
        <Card className="px-2 ">
          <FilterForm searchUrlItems={resolvedPromise} />
        </Card>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className="flex justify-between items-start flex-col md:flex-row md:items-center my-4 ">
          {/* Clear query link */}
          <Suspense fallback={'Loading..'}>
            <AnimateFilter
              category={category}
              price={price}
              rating={rating}
              q={q}
            />
          </Suspense>
          {/* Sort */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:gap-2">
            <p>SORT PRODUCTS BY: </p>
            <div className="flex items-center gap-2">
              {sortProductsBy.map((s) =>
                sort === s ? (
                  <Badge key={s}>
                    <Link
                      className={` ${sort === s && 'font-bold'}`}
                      href={getFilterUrl({ s })}
                    >
                      {s === 'lowest'
                        ? 'cheapest'
                        : s === 'highest'
                          ? 'expensive'
                          : s}
                    </Link>
                  </Badge>
                ) : (
                  <Link key={s} href={getFilterUrl({ s })}>
                    {s === 'lowest'
                      ? 'cheapest'
                      : s === 'highest'
                        ? 'expensive'
                        : s}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
      {/* Pagination */}
      <div className="col-span-full">
        <Pagination page={Number(page)} totalPages={products.totalPages} />
      </div>
    </div>
  );
};
export default DSearchPage;

import ProductCard from '@/components/shared/product/product-card';
import { getAllCategories, getAllProducts } from '@/lib/actions/product.action';
import Link from 'next/link';
import ButtonClearFilters from './button-clear-all-filters';
import { Badge } from '@/components/ui/badge';

const prices = [
  { name: '€1 to €100', value: '1-100' },
  { name: '€101 to €200', value: '101-200' },
  { name: '€201 to €500', value: '201-500' },
  { name: '€501 to €1000', value: '501-1000' },
  // { name: '€1000+', value: '>1000' },
];

const ratings = [4, 3, 2, 1];

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
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await searchParams;

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

  const [products, categories] = await Promise.all([
    getAllProducts({
      query: q,
      category,
      price,
      rating,
      sort,
      page: Number(page),
    }),
    getAllCategories(),
  ]);

  //   await new Promise((res) => setTimeout(res, 3000));
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div>
        {/* category filter */}
        <div className="text-xl mb-2 mt-3">CATEGORY</div>
        <div>
          <ul className="space-y-1 mt-2">
            <li>
              <Link
                className={`${
                  (category === 'all' || category === '') && 'font-bold'
                }`}
                href={getFilterUrl({ c: 'all' })}
              >
                All
              </Link>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.category}
                className="hover:font-bold hover:translate-x-2 duration-200 active:translate-x-4 "
              >
                <Link
                  href={getFilterUrl({ c: cat.category })}
                  className={`${category === cat.category ? 'font-bold ' : ''}`}
                >
                  {cat.category} ({cat._count})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Prices left filter */}
        <div className="text-xl mb-2 mt-6">PRICE</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  (price === 'all' || price === '') && 'font-bold'
                }`}
                href={getFilterUrl({ p: 'all' })}
              >
                All
              </Link>
            </li>
            {prices.map((prc) => {
              return (
                <li
                  key={prc.name}
                  className="hover:font-bold hover:translate-x-2 duration-200 active:translate-x-4"
                >
                  <Link
                    href={getFilterUrl({ p: prc.value })}
                    className={`${price === prc.value ? 'font-bold' : ''}`}
                  >
                    {prc.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Ratings left filter */}
        <div className="text-xl mb-2 mt-6">RATINGS</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  (rating === 'all' || rating === '') && 'font-bold'
                }`}
                href={getFilterUrl({ r: 'all' })}
              >
                All
              </Link>
            </li>
            {ratings.map((r) => {
              return (
                <li
                  key={r}
                  className="hover:font-bold hover:translate-x-2 duration-200 active:translate-x-4"
                >
                  <Link
                    href={getFilterUrl({ r: `${r}` })}
                    className={`${rating === r.toString() ? 'font-bold' : ''}`}
                  >
                    {`${r} stars & up`}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex justify-between items-start flex-col md:flex-row md:items-center my-4 ">
          {/* Clear query link */}
          <div className="flex items-center gap-2">
            {/* {q !== 'all' && q !== '' && ' Query: ' + q} */}
            {category !== 'all' && category !== '' && (
              <Badge>
                {' '}
                <p>category</p>
              </Badge>
            )}
            {price !== 'all' && price !== '' && (
              <Badge>
                <p>{`€${price}`}</p>
              </Badge>
            )}
            {rating !== 'all' && rating !== '' && (
              <Badge>
                <p>{`stars up${rating}`}</p>
              </Badge>
            )}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <ButtonClearFilters />
            ) : null}
          </div>
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
                      {s}
                    </Link>
                  </Badge>
                ) : (
                  <Link key={s} href={getFilterUrl({ s })}>
                    {s}
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
    </div>
  );
};
export default DSearchPage;

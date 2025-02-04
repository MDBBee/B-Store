import ProductCard from '@/components/shared/product/product-card';
import { getAllCategories, getAllProducts } from '@/lib/actions/product.action';
import Link from 'next/link';
import ButtonClearFilters from './button-clear-all-filters';

const prices = [
  { name: '€1 to €100', value: '1-100' },
  { name: '€101 to €200', value: '101-200' },
  { name: '€201 to €500', value: '201-500' },
  { name: '€501 to €1000', value: '501-1000' },
  { name: '€1000+', value: '>1000' },
];

const ratings = [4, 3, 2, 1];

const sortProductsBy = ['newest', 'lowest', 'highest', 'rating'];

const SearchPage = async (props: {
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
  } = await props.searchParams;

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

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Left Filters */}
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
        <div className="flex-between flex-col md:flex-row my-4">
          {/* Clear query link */}
          <div className="flex items-center">
            {q !== 'all' && q !== '' && ' Query: ' + q}
            {category !== 'all' && category !== '' && ' Category: ' + category}
            {price !== 'all' && price !== '' && ' Price: ' + price}
            {rating !== 'all' &&
              rating !== '' &&
              ' Rating: ' + rating + 'stars up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <ButtonClearFilters />
            ) : null}
          </div>
          {/* Sort */}
          <div className="flex">
            SORT PRODUCTS BY:{' '}
            {sortProductsBy.map((s) => (
              <div key={s} className="mx-2 hover:scale-110 duration-200 ">
                <Link
                  className={` ${sort === s && 'font-bold'}`}
                  href={getFilterUrl({ s })}
                >
                  {s}
                </Link>
              </div>
            ))}
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
export default SearchPage;

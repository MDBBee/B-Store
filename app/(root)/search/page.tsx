import { Suspense } from 'react';
import DSearchPage from './d-search-page';
import DLoadingSearchPage from './d-loading-search-page';

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    price: string;
    category: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet =
    category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ''} 
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}
      `,
    };
  }
  return { title: 'search' };
}

const SearchPage = async ({
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
  return (
    <Suspense fallback={<DLoadingSearchPage />}>
      <DSearchPage searchParams={searchParams} />
    </Suspense>
  );
};
export default SearchPage;

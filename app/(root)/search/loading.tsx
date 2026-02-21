import { ProductCardSkeleton } from '@/components/loading-cards/loading-product-cards';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const sortProductsBy = ['newest', 'lowest', 'highest', 'rating'];

const LoadingPage = () => {
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <div className="text-xl mb-2 mt-3">CATEGORY</div>
        <Skeleton className="h-full" />
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center">
            <Skeleton className="h-8" />
          </div>
          <div className="flex items-center">
            SORT PRODUCTS BY:{' '}
            {sortProductsBy.map((s) => (
              <div key={s} className="mx-2 hover:scale-110 duration-200 ">
                <Button variant="ghost" disabled>
                  {s}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;

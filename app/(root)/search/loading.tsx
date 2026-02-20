import { ProductCardSkeleton } from '@/components/loading-cards/loading-product-cards';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <Skeleton className="h-full" />
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <Skeleton className="h-16 w-full" />
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

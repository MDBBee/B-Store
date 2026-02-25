import { ProductCardSkeleton } from '@/components/loading-cards/loading-product-cards';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <Card className="md:col-span-5 md:block md:h-20 hidden">
        <Skeleton className="w-full h-full " />
      </Card>
      <Card className="md:h-full w-full h-32 mb-4">
        <Skeleton className="w-full h-full " />
      </Card>
      <div className="md:col-span-4 space-y-4">
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

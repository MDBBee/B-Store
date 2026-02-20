import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm rounded-md hover:-translate-y-2 hover:shadow-accent hover:shadow-lg duration-200">
      <CardHeader>
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}

const LoadingProductCards = () => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">Newest Arrivals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};
export default LoadingProductCards;

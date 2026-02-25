import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 mt-2">
          <div className="col-span-2 h-[500px]">
            <Skeleton className="aspect-video w-full h-full" />
          </div>

          <div className="col-span-2 p-5">
            <Skeleton className="aspect-video w-full h-full" />
          </div>

          <div>
            <Card className="w-full h-[40%]">
              <CardContent className="mb-2 flex justify-between">
                <Skeleton className="h-4 " />
                <Skeleton className="h-4 " />
                <hr />
                <Skeleton className="h-4 " />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10"></section>
    </>
  );
};
export default ProductSkeleton;

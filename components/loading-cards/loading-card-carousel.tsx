import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const LoadingCardCarousel = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="w-full h-80" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
};
export default LoadingCardCarousel;

'use client';

import { Review } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReviewForm from './review-form';
import { getReviews } from '@/lib/actions/review.actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Rating from '@/components/shared/product/rating';

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetcReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };
    fetcReviews();
  }, [productId]);
  // Reload reviews after review creation or update
  const reload = () => {};
  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No Reviews yet!</div>}
      {userId ? (
        // review form
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please{' '}
          <Link
            className="text-accent px-2 font-semibold"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            <i className="text-xl">Sign In</i>
          </Link>
          to leave a review.
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{r.title}</CardTitle>
              </div>
              <CardDescription>{r.description}</CardDescription>
              <CardContent>
                <div className="flex space-x-4 text-sm  text-muted-foreground">
                  {/* Rating stars */}
                  <Rating value={r.rating} />
                  <div className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    {r.user ? r.user.name : 'User'}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDateTime(new Date(r.createdAt)).dateTime}
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ReviewList;

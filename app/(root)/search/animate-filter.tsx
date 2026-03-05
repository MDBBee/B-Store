'use client';

import { Badge } from '@/components/ui/badge';
import ButtonClearFilters from './button-clear-all-filters';
import { AnimatePresence, motion } from 'motion/react';
import { HIGHEST_PRODUCT_PRICE } from '@/lib/constants';

const AnimateFilter = ({
  category,
  price,
  rating,
  q,
}: {
  category: string;
  price: string;
  rating: string;
  q: string;
}) => {
  const filters = [
    category !== 'all' && category !== ''
      ? { key: 'category', label: category }
      : null,
    price !== 'all' &&
    price !== '' &&
    price.split('-')[1] !== HIGHEST_PRODUCT_PRICE
      ? { key: 'price', label: `€${price}` }
      : null,
    rating !== 'all' && rating !== ''
      ? { key: 'rating', label: `stars up ${rating}` }
      : null,
    q !== 'all' && q !== '' ? { key: 'query', label: q } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="popLayout">
        {filters.map((filter) => (
          <motion.div
            key={filter.key}
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge>
              <p>{filter.label}</p>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>

      {filters.length > 0 && <ButtonClearFilters />}
    </div>
  );
};
export default AnimateFilter;

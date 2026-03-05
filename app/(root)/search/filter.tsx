'use client';

import { Button } from '@/components/ui/button';
import { ListFilterPlus } from 'lucide-react';
import FilterForm from './filter-form';
import { useState } from 'react';
import { motion } from 'motion/react';

const FilterSearcPage = ({
  searchUrlItems,
}: {
  searchUrlItems: {
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };
}) => {
  const [openFilter, toggleOpenFilter] = useState(false);

  return (
    <div className="overflow-hidden">
      <Button
        onClick={() =>
          toggleOpenFilter((prev) => (prev === true ? false : true))
        }
        variant="outline"
        className="w-full"
      >
        <ListFilterPlus /> Filter
      </Button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          openFilter
            ? { height: 'auto', opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ type: 'spring' }}
        className="p-2 mt-1 border-2 border-border rounded-lg"
      >
        <FilterForm searchUrlItems={searchUrlItems} />
      </motion.div>
    </div>
  );
};
export default FilterSearcPage;

'use client';

import { Field, FieldDescription, FieldSeparator } from '@/components/ui/field';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type SelectProps = { label: string; value: string }[];

const ratings = [
  { label: 'All', value: 'all' },
  { label: '4 Stars & Up', value: '4' },
  { label: '3 Stars & Up', value: '3' },
  { label: '2 Stars & Up', value: '2' },
  { label: '1 Star & Up', value: '1' },
] as SelectProps;

export default function FilterForm({
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
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const [min, max] = (searchUrlItems?.price?.split('-') ?? ['0', '2000']).map(
      Number,
    );
    return [min, max] as [number, number];
  });
  const [cat, setCat] = useState(searchUrlItems?.category ?? 'all');
  const [rat, setRat] = useState(searchUrlItems?.rating ?? 'all');

  // Update form on reset
  useEffect(() => {
    if (Object.keys(searchUrlItems).length === 0) {
      setPriceRange([0, 2000]);
      setCat('all');
      setRat('all');
    }
  }, [searchUrlItems]);

  const categories = PRODUCT_CATEGORIES;

  return (
    <form
      ref={formRef}
      action="/search"
      method="GET"
      className="space-y-3 my-3"
    >
      {/* categories */}
      <FieldDescription>Category</FieldDescription>
      <Select name="category" value={cat} onValueChange={(val) => setCat(val)}>
        <SelectTrigger>
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((x) => (
            <SelectItem key={x.value} value={x.value} className="capitalize">
              {x.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldSeparator />

      {/* Price */}
      <Field className="w-full max-w-xs">
        <FieldDescription>
          Range (€
          <span className="font-medium tabular-nums">
            {priceRange[0]}
          </span> -{' '}
          <span className="font-medium tabular-nums">{priceRange[1]}</span>).
        </FieldDescription>

        <Slider
          value={priceRange} // Dual-handle controlled value
          onValueChange={(val) => setPriceRange(val as [number, number])}
          defaultValue={[priceRange?.[0] ?? 0, priceRange?.[1] ?? 2000]}
          max={2000}
          min={0}
          step={50}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
        <input
          type="hidden"
          name="price"
          value={`${priceRange[0]}-${priceRange[1]}`}
        />
      </Field>

      <FieldSeparator />

      {/* Ratings */}
      <Field>
        <FieldDescription>Rating</FieldDescription>
        <Select name="rating" value={rat} onValueChange={(val) => setRat(val)}>
          <SelectTrigger>
            <SelectValue placeholder="rating" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((x) => (
              <SelectItem key={x.value} value={x.value} className="capitalize">
                {x.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            router.push('/search');
          }}
          className="w-full "
        >
          Reset Filter
        </Button>
        <Button className="w-full">
          Apply <Filter />
        </Button>{' '}
      </div>
    </form>
  );
}

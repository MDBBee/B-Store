'use client';

import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const CarouselHp = ({ data }: { data: Product[] }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <Carousel
      className="w-full mb-12"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id} className="relative">
            <Link href={`/product/${product.slug}`}>
              <div className="absolute text-accent top-4 left-4 opacity-50 z-20">
                <p className="lg:text-7xl md:text-lg text-sm ">Sales From</p>
                <h2 className="lg:text-7xl md:text-lg text-sm">
                  (30% - 50%)OFF
                </h2>
              </div>
              <div className="relative mx-auto h-[400px] ">
                <Image
                  src={product.banner!}
                  alt={product.name}
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="bg-accent p-4 rounded-md opacity-60 text-5xl font-bold px-2 text-teal-800">
                    Deal is NOW!
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CarouselHp;

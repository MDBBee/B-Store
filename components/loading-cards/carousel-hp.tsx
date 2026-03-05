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
            <div className="absolute top-0 left-0 h-full w-full pointer-events-none bg-gradient-to-r from-black/40 to-black/10 z-50"></div>

            <Link href={`/product/${product.slug}`}>
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

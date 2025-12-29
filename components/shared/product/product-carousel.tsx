'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          // stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id} className="relative">
            <Link href={`/product/${product.slug}`}>
              <div className="absolute text-accent top-4 left-4 opacity-50 z-20">
                <p className="text-5xl ">Sales From</p>
                <h2 className="text-9xl">(30% - 50%)OFF</h2>
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

export default ProductCarousel;

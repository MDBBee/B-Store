'use client';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="h-[400px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={`border-4 mr-2 cursor-pointer hover:border-green-900 ${
              current === index && 'border-green-800'
            }`}
          >
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              className="object-cover h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;

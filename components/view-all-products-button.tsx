import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const ViewAllProductsButton = () => {
  return (
    <div className="flex justify-center items-center md:my-6 my-4 w-full md:w-auto">
      <Button asChild className="px-8 py-4 text-lg font-semibold group w-full">
        <Link href="/search">
          See All Products{' '}
          <ArrowRight className="group-hover:translate-x-2 duration-150" />{' '}
        </Link>
      </Button>
    </div>
  );
};
export default ViewAllProductsButton;

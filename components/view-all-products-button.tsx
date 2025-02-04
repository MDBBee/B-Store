import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const ViewAllProductsButton = () => {
  return (
    <div className="flex justify-center items-center my-8 ">
      <Button asChild className="px-8 py-4 text-lg font-semibold group ">
        <Link href="/search">
          View All Products{' '}
          <ArrowRight className="group-hover:translate-x-2 duration-150" />{' '}
        </Link>
      </Button>
    </div>
  );
};
export default ViewAllProductsButton;

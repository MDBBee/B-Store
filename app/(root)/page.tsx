import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import {
  getFeaturedProducts,
  getLatestProducts,
} from '@/lib/actions/product.action';
import Link from 'next/link';

export const metadata = {
  title: 'Home',
};

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 ? (
        <div className="relative h-[400px]">
          <ProductCarousel data={featuredProducts} />
        </div>
      ) : (
        ''
      )}
      <ProductList title="Newest Arrivals" data={latestProducts} limit={4} />
    </>
  );
};

export default Homepage;

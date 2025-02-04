import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
import {
  getFeaturedProducts,
  getLatestProducts,
} from '@/lib/actions/product.action';

export const metadata = {
  title: 'Home',
};

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 ? (
        <ProductCarousel data={featuredProducts} />
      ) : (
        ''
      )}
      <ProductList title="Newest Arrivals" data={latestProducts} limit={4} />
      <ViewAllProductsButton />
    </>
  );
};

export default Homepage;

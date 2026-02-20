import Carousel from '@/components/loading-cards/carousel-hp';
import { getFeaturedProducts } from '@/lib/actions/product.action';

const ProductCarousel = async () => {
  const featuredProducts = await getFeaturedProducts();

  if (featuredProducts.length > 0) return <Carousel data={featuredProducts} />;

  return '';
};

export default ProductCarousel;

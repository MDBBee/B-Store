import ProductForm from '@/components/admin/product-form';
import { getProductById } from '@/lib/actions/product.action';
import { notFound } from 'next/navigation';

const DAdminProductsIdPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) return notFound();
  return <ProductForm type="Update" product={product} productId={product.id} />;
};
export default DAdminProductsIdPage;

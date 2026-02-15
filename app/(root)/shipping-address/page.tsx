import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.action';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShippingAddressForm from './shipping-address-form';
import { ShippingAddress } from '@/types';
import { BreadCrumb } from '@/components/shared/breadcrumb';

export const metadata: Metadata = {
  title: 'Shipping Adress',
};

const ShippingAddressPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const resolvedSearcParams = await searchParams;

  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect('/cart');

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('No user ID');

  const user = await getUserById(userId);

  // User redirected due to invalid address
  const showError = resolvedSearcParams.error === 'address-required';

  return (
    <>
      <BreadCrumb current={1} />
      <ShippingAddressForm
        address={user.address as ShippingAddress}
        showError={showError}
      />
    </>
  );
};
export default ShippingAddressPage;

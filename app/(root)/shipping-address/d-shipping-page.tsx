import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import ShippingAddressForm from './shipping-address-form';
import { ShippingAddress } from '@/types';

const DShippingPage = async ({
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
    <ShippingAddressForm
      address={user.address as ShippingAddress}
      showError={showError}
    />
  );
};
export default DShippingPage;

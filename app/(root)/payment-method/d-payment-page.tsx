import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.action';
import PaymentMethodForm from './payment-method-form';
import { shippingAddressSchema } from '@/lib/validators';
import { redirect } from 'next/navigation';

const DPaymentPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  // 🔥 Validate shipping address.
  const validatedAddress = shippingAddressSchema.safeParse(user?.address);
  if (!validatedAddress.success) {
    redirect('/shipping-address?error=address-required');
  }
  return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />;
};
export default DPaymentPage;

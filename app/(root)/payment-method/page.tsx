import { Metadata } from 'next';
import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.action';
import PaymentMethodForm from './payment-method-form';
import { BreadCrumb } from '@/components/shared/breadcrumb';
import { shippingAddressSchema } from '@/lib/validators';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Select Payment Method',
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  // 🔥 Validate shipping address.
  const validatedAddress = shippingAddressSchema.safeParse(user?.address);
  if (!validatedAddress.success) {
    redirect('/shipping-address?error=address-required');
  }

  return (
    <>
      <BreadCrumb current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;

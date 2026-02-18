import { Metadata } from 'next';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import ProfileForm from './profile-form';
import ShippingAddressForm from '@/app/(root)/shipping-address/shipping-address-form';
import { getUserById } from '@/lib/actions/user.action';
import { ShippingAddress } from '@/types';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

const Profile = async () => {
  const session = await auth();

  const user = await getUserById(session?.user?.id as string);

  // Note:
  // 1) ProfileForm is a client comp, and we need to use  "session" in the client comp,
  // 2) SessionProvider wrapper makes session-data available  in the ProfileForm component.

  return (
    <SessionProvider session={session}>
      <div className="grid  md:grid-cols-2 mx-auto w-full  gap-8 ">
        <div>
          <h2 className="h2-bold">Profile</h2>
          <ProfileForm />
        </div>
        <div>
          <ShippingAddressForm
            address={user.address as ShippingAddress}
            userProfile={true}
          />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Profile;

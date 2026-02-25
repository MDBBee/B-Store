import { Metadata } from 'next';
import DUserProfilePage from './d-user-profile-page';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

const Profile = async () => {
  // Note:
  // 1) ProfileForm is a client comp, and we need to use  "session" in the client comp,
  // 2) SessionProvider wrapper makes session-data available  in the ProfileForm component.

  return (
    <Suspense fallback={'Loading...'}>
      <DUserProfilePage />
    </Suspense>
  );
};

export default Profile;

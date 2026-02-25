import { Metadata } from 'next';
import { Suspense } from 'react';
import DLoadingPage from '../../d-loading';
import DAdminUsersIdPage from './d-admin-users-id-page';

export const metadata: Metadata = {
  title: 'Update User',
};

const AdminUserUpdatePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  return (
    <Suspense fallback={<DLoadingPage />}>
      <DAdminUsersIdPage params={params} />
    </Suspense>
  );
};

export default AdminUserUpdatePage;

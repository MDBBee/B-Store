import { Metadata } from 'next';
import { Suspense } from 'react';
import DLoadingPage from '../d-loading';
import DAdminUsersPage from './d-admin-users-page';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUserPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  return (
    <Suspense fallback={<DLoadingPage />}>
      <DAdminUsersPage searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminUserPage;

import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.action';
import UpdateUserForm from './update-user-form';
import { Suspense } from 'react';

const DAdminUsersIdPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>
      <Suspense fallback={'Loading...'}>
        <UpdateUserForm user={user} />
      </Suspense>
    </div>
  );
};
export default DAdminUsersIdPage;

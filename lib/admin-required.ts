import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const adminRequired = async () => {
  const session = await auth();
  if (session?.user.role !== 'admin') redirect('/unauthorized');
};

export default adminRequired;

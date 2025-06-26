import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const adminRequired = async () => {
  const session = await auth();
  if (session?.user.role !== 'admin') redirect('/');
};

export default adminRequired;

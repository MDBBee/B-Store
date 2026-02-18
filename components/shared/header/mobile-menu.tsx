import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { signOutUser } from '@/lib/actions/user.action';
import Link from 'next/link';
import GuestButton from './guest-button';

const MobileMenu = async () => {
  const session = await auth();

  if (!session) {
    return <GuestButton />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-sm font-medium leading-none  ">
        {session.user?.name}
      </div>
      <div className="text-sm text-muted-foreground leading-none ">
        {session.user?.email}
      </div>

      <hr />

      <Button asChild variant="outline">
        <Link href="/user/profile" className="w-full">
          User Profile
        </Link>
      </Button>

      <Button asChild variant="outline">
        <Link href="/user/orders" className="w-full">
          Order History
        </Link>
      </Button>

      {session.user?.role === 'admin' && (
        <Button asChild variant="outline">
          <Link href="/admin/overview" className="w-full">
            Admin
          </Link>
        </Button>
      )}

      <form action={signOutUser} className="w-full">
        <Button variant="secondary" className="w-full">
          Sign Out
        </Button>
      </form>
    </div>
  );
};
export default MobileMenu;

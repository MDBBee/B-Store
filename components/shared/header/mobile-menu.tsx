import { Button } from '@/components/ui/button';
import { signOutUser } from '@/lib/actions/user.action';
import Link from 'next/link';
import GuestButton from './guest-button';
import { SheetClose } from '@/components/ui/sheet';
import { Session } from 'next-auth';

const MobileMenu = async ({ session }: { session: Session | null }) => {
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

      <SheetClose asChild className="w-full">
        <Button asChild variant="outline">
          <Link href="/user/profile" className="w-full">
            User Profile
          </Link>
        </Button>
      </SheetClose>

      <SheetClose asChild className="w-full">
        <Button asChild variant="outline">
          <Link href="/user/orders" className="w-full">
            Order History
          </Link>
        </Button>
      </SheetClose>

      <SheetClose asChild className="w-full">
        {session.user?.role === 'admin' && (
          <Button asChild variant="outline">
            <Link href="/admin/overview" className="w-full">
              Admin
            </Link>
          </Button>
        )}
      </SheetClose>

      <form action={signOutUser} className="w-full">
        <Button variant="secondary" className="w-full">
          Sign Out
        </Button>
      </form>
    </div>
  );
};
export default MobileMenu;

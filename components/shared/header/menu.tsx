import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { LayoutList, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';
import MobileMenu from './mobile-menu';
import Image from 'next/image';
import { auth } from '@/auth';

const Menu = async () => {
  const session = await auth();

  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? '';
  const img = session?.user?.image;

  return (
    <div className="flex justify-end gap-3 [scrollbar-gutter:stable]">
      {/* Large screen */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        {/* user-button */}
        <UserButton />
      </nav>
      {/* Small Screen */}
      <nav className="md:hidden w-full">
        <Sheet>
          <SheetTrigger className="align-middle">
            <LayoutList />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <MobileMenu />

            <Button asChild variant="outline" className="w-full">
              <Link href="/cart" className="flex gap-2">
                <ShoppingCart /> Cart
              </Link>
            </Button>

            <SheetDescription>
              <div className="flex gap-4 items-center">
                {img ? (
                  <Image
                    src={img}
                    alt="Profile-avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    priority
                  />
                ) : (
                  <Button
                    variant="ghost"
                    id="user"
                    className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 text-black"
                  >
                    {firstInitial}
                  </Button>
                )}
                <ModeToggle />
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
export default Menu;

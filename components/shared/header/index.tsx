import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import Search from './search';
import logo from '@/public/images/logo.svg';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start ">
          {/* <Logo /> */}
          <Link href="/" className="flex-start ml-4 group ">
            <Image
              src={logo}
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              className="h-6 w-8 md:h-8 md:w-12 hover:scale-125 duration-300 border-2 rounded-lg"
            />
            <span className="hidden font-bold text-2xl ml-3 lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        {/* Search */}
        <div className="hidden md:block">
          <Suspense fallback={<Skeleton className="w-40 h-10 " />}>
            <Search />
          </Suspense>
        </div>
        {/*Menu = Cart,Theme & UserIcon */}
        <Suspense fallback={<Skeleton className="w-10 h-10" />}>
          <Menu />
        </Suspense>
      </div>
    </header>
  );
};
export default Header;

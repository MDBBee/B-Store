import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
// import CategoryDrawer from './category-drawer';
import Search from './search';
import logo from '@/public/images/logo.svg';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start ">
          {/* <CategoryDrawer /> */}
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
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};
export default Header;

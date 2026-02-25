import { APP_NAME } from '@/lib/constants';
import { cacheLife } from 'next/cache';

async function DynamicYearComp() {
  'use cache';
  cacheLife('days');

  const year = new Date().getFullYear();

  return (
    <div className="p-5 flex-center">
      © {year} {APP_NAME}. All Rights Reserved
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="border-t">
      <DynamicYearComp />
    </footer>
  );
};
export default Footer;

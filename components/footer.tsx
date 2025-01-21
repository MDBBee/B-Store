import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {year} {APP_NAME}. All Rights Reserved
      </div>
    </footer>
  );
};
export default Footer;

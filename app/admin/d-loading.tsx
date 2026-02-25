import Image from 'next/image';
import loader from '@/assets/loader1.gif';

const DLoadingPage = () => {
  return (
    <div className="h-[75vh] flex items-center justify-center ">
      <Image src={loader} height={150} width={150} alt="Loading" />
    </div>
  );
};
export default DLoadingPage;

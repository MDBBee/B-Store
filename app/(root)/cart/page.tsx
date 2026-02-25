import { Suspense } from 'react';
import DynamicCartPage from './dynamic-cart-page';

export const metadata = {
  title: 'Shopping Cart',
};

const CartPage = async () => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <DynamicCartPage />
      </Suspense>
    </>
  );
};
export default CartPage;

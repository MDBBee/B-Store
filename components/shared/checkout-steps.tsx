import { cn } from '@/lib/utils';
import React from 'react';

const CheckOutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between flex-col space-x-2 space-y-2 mb-10 md:flex-row">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => {
          return (
            <React.Fragment key={step}>
              <div
                className={cn(
                  'p-2 w-56 rounded-full text-center text-sm',
                  index === current ? 'bg-secondary' : ''
                )}
              >
                {step}
              </div>
              {step !== 'Place Order' && (
                <hr className="w-16 border-t border-gray-300 mx-2" />
              )}
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};
export default CheckOutSteps;

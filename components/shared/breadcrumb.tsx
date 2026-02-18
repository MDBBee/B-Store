'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export function BreadCrumb({ current }: { current?: number }) {
  const fullPath = usePathname();
  const name = fullPath.split('/').at(-1) as string;

  const checkout_steps = [
    { key: 'cart', label: 'Cart', position: 1 },
    { key: 'shipping-address', label: 'Shipping Address', position: 2 },
    { key: 'payment-method', label: 'Payment Method', position: 3 },
    { key: 'place-order', label: 'Place Order', position: 4 },
  ] as const;

  const stepsToRender = current ? checkout_steps : [];

  return (
    <Breadcrumb className="mb-8 mt-4">
      <BreadcrumbList className="px-2 py-1">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ArrowRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/search">All Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ArrowRight />
        </BreadcrumbSeparator>
        {current ? (
          stepsToRender.map((step, i) => {
            const isLast = i === stepsToRender.length - 1;
            return (
              <React.Fragment key={step.key}>
                <BreadcrumbItem
                  className={
                    name === step.key
                      ? 'bg-accent px-2 py-1 rounded-2xl text-background'
                      : ''
                  }
                >
                  <BreadcrumbLink asChild>
                    <Link href={`/${step.key}`}>{step.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator>
                    <ArrowRight />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

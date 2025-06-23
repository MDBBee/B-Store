import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [],
  callbacks: {
    async authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin\/(.*)/,
        /\/admin/,
      ];

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl;

      // Check if user not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((path) => path.test(pathname)))
        return false;

      // Session cart cookie check?
      if (!request.cookies.get('sessionCartId')) {
        // create new sessionCartId
        const sessionCartId = crypto.randomUUID();
        // Clone req headers
        const newRequestHeaders = new Headers(request.headers);
        // Response
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        // Set newly generated sessionCartId in the res cookies
        response.cookies.set('sessionCartId', sessionCartId);

        return response;
      } else return true;
    },
  },
} satisfies NextAuthConfig;

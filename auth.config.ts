import type { NextAuthConfig, Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const authConfig = {
  providers: [],
  callbacks: {
    async authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      // Invoked when a user needs authorization, using Middleware.
      // Basic website navigation is enough to trigger this func because it serves as the apps middleware
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

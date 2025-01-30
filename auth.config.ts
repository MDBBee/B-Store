import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request }: any) {
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

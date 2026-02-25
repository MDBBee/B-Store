// export { auth as middleware } from '@/auth';

// proxy.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // This just tells Next.js: "Don't run my auth/UUID logic for images and CSS"
  // It doesn't replace your protectedPaths; it just protects your server's CPU.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
};

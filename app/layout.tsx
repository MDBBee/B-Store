import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import '@/assets/styles/globals.css';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

const varela_Round = Varela_Round({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: {
    template: `%s | B-store`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${varela_Round.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import CredentialsSignInForm from './credentials-signin-form';
import { auth } from '@/auth';
import { GithubSignIn } from '@/components/shared/auth/github-sign-in';
import { GoogleSignIn } from '@/components/shared/auth/google-sign-in';
import { redirect } from 'next/navigation';

const DynamicSignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) return redirect(callbackUrl || '/');
  return (
    <>
      {' '}
      <Card>
        <CardHeader className="space-y-2">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={50}
              height={50}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Form component */}
          <div className="flex items-center gap-2">
            <GithubSignIn />
            <GoogleSignIn />
          </div>
          <hr />
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </>
  );
};
export default DynamicSignInPage;

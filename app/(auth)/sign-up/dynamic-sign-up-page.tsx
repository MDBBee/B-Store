import { auth } from '@/auth';
import { redirect } from 'next/navigation';
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
import SignUpForm from './sign-up-form';
import { GithubSignIn } from '@/components/shared/auth/github-sign-in';
import { GoogleSignIn } from '@/components/shared/auth/google-sign-in';

const DynamicSignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (session) return redirect(callbackUrl || '/');
  return (
    <div className="w-full max-w-md mx-auto px-2">
      <Card className="">
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
          <CardTitle className="text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Sign-Up using Github, Google or by filling the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Form component */}
          <div className="flex items-center gap-2">
            <GithubSignIn />
            <GoogleSignIn />
          </div>
          <hr />
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default DynamicSignUpPage;

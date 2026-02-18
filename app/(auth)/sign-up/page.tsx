import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignUpForm from './sign-up-form';
import { GithubSignIn } from '@/components/shared/auth/github-sign-in';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) return redirect(callbackUrl || '/');

  return (
    <div className="w-full max-w-md mx-auto">
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
            Sign Up with Github, Google or Filling the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Form component */}
          <GithubSignIn />
          <hr />
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default SignUpPage;

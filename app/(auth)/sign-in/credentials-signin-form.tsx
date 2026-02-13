'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithCredentials } from '@/lib/actions/user.action';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CredentialsSignInForm = () => {
  const { toast } = useToast();
  const [data, action, isPending] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  console.log('🌐🌐🌐🌐', callbackUrl);

  useEffect(() => {
    if (!data.success && data.message) {
      toast({
        variant: 'destructive',
        description: data.message,
        duration: 3000,
      });
    }
  }, [data, toast]);

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            required
            name="email"
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            required
            name="password"
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          {/* <SignInButton /> */}
          <Button className="w-full" variant="default" disabled={isPending}>
            {isPending ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account ?{' '}
          <Link href="/sign-up" className="link text-xl text-green-700">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

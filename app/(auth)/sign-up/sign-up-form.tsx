'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { signUpUser } from '@/lib/actions/user.action';
import { useToast } from '@/hooks/use-toast';

const SignUpForm = () => {
  const { toast } = useToast();
  const [data, action, isPending] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const errorMessage =
    data && !data.success ? data.message.split('-')[0] : false;
  const errorPath = (data &&
    !data.success &&
    data.message.split('-')[1]) as string;

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: 'destructive',
        description: errorMessage,
        duration: 3000,
      });
    }
  }, [data, toast, errorMessage]);

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
            className={`${errorPath && errorPath.split(',').includes('password') ? 'border-2 border-destructive' : ''}`}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
            className={`${errorPath && errorPath.split(',').includes('confirmPassword') ? 'border-2 border-destructive' : ''}`}
          />
        </div>
        <div>
          <Button disabled={isPending} className="w-full" variant="default">
            {isPending ? 'Submitting...' : 'Sign Up'}
          </Button>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" target="_self" className="link text-green-400">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

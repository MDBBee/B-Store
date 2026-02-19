import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';
import Google from '@/components/ui/google';

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
      className="w-full"
    >
      <Button className="w-full cursor-pointer" variant="outline">
        <Google />
        Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };

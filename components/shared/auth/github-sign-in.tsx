import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';
import { Github } from '../../ui/github';

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <Button className="w-full cursor-pointer" variant="outline">
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Home</h1>
      <Link className={buttonVariants({ variant: 'default' })} href="/about">
        About
      </Link>
    </div>
  );
}

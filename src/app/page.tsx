'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center">
            <Skeleton className="h-16 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

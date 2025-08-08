'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M78,85H22c-1.7,0-3-1.3-3-3s1.3-3,3-3h8.1c-1-2.9-1.6-6-1.6-9.2c0-8.3,3-15.9,8.4-21.6l-5.6-5.6c-0.6-0.6-0.9-1.3-0.9-2.1c0-0.8,0.3-1.5,0.9-2.1c2.8-2.8,7.5-2.8,10.3,0l5.6,5.6c0.5-0.4,1-0.8,1.6-1.1V22.4c0-4.6,3.8-8.4,8.4-8.4h4.3c4.6,0,8.4,3.8,8.4,8.4v20.5c3.2,1.9,5.9,4.6,7.7,7.7c1.2,2,2.1,4.2,2.5,6.5H88c1.7,0,3,1.3,3,3s-1.3,3-3,3h-2.1c-0.5,3.3-1.6,6.5-3.4,9.2H78z M50,39.1c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6S53.1,39.1,50,39.1z M52.1,28.5c2.3,0,4.2,1.9,4.2,4.2s-1.9,4.2-4.2,4.2s-4.2-1.9-4.2-4.2S49.8,28.5,52.1,28.5z" />
      </svg>
    </div>
  );
}

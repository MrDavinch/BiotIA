'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.25 3.018a1.75 1.75 0 0 1 3.25 1.482v4.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.25c0-.398.13-.764.35-1.042L13.25 3.018zM14.75 4.5a.75.75 0 0 0-.75.75v5.25h1.5V5.25a.75.75 0 0 0-.75-.75zm5.513 3.428a.75.75 0 0 1 .737.662C21.43 12.44 18.82 15 15.5 15H11v-1h4.5c2.42 0 4.29-1.92 4.763-4.572z" />
        <path d="M12.5 10h-1v1.5a.75.75 0 0 0 .75.75h.5a.75.75 0 0 0 .75-.75V11a.75.75 0 0 0-.75-.75z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.75 14H2.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5z" />
        <path d="M9.5 7h-3a.75.75 0 0 0-.75.75v5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5A.75.75 0 0 0 9.5 7zm-2.25.75h1.5v5h-1.5v-5z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15.25 18H3.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z" />
      </svg>
    </div>
  );
}


'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M50,10A40,40,0,1,0,90,50,40,40,0,0,0,50,10ZM73.2,65.6a2,2,0,0,1-2.8,0l-15-15a2,2,0,0,1,0-2.8l15-15a2,2,0,1,1,2.8,2.8L59.6,50,73.2,63.6A2,2,0,0,1,73.2,65.6ZM42.4,65.6a2,2,0,0,1-2.8,0l-15-15a2,2,0,0,1,0-2.8l15-15a2,2,0,1,1,2.8,2.8L30.8,50,42.4,63.6A2,2,0,0,1,42.4,65.6Z" />
    </svg>
  );
}

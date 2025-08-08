'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="BiotIA Pro Logo"
      width={80}
      height={80}
      className={cn(className)}
    />
  );
}

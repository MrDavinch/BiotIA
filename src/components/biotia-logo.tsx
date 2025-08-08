'use client';

import Image from 'next/image';
import { cn } from "@/lib/utils";

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <Image
      src="/microscope-logo.png"
      alt="BiotIA Pro Logo"
      width={100}
      height={100}
      className={cn("w-12 h-12", className)}
      priority
    />
  );
}

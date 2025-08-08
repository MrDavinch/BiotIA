'use client';

import { cn } from "@/lib/utils";
import './biotia-logo.css';

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <div className={cn("biotia-logo", className)}>
      <div className="arm"></div>
      <div className="eyepiece"></div>
      <div className="objective"></div>
    </div>
  );
}

'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <div className={cn("p-2 bg-primary rounded-lg", className)}>
        <svg 
            viewBox="0 0 64 64" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M24 12 L24 20" /> 
            <path d="M40 12 L40 20" />
            
            <path d="M20 20 L44 20" /> 
            
            <path d="M32 20 L32 40" />
            
            <path d="M24 40 L40 40" />
            
            <path d="M28 44 L36 44" />
            
            <circle cx="32" cy="50" r="8" />
        </svg>
    </div>
  );
}

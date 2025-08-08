'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps {
  className?: string;
}

export function BiotiaLogo({ className }: BiotiaLogoProps) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-primary", className)}
        aria-hidden="true"
    >
        <g transform="translate(0, -1.5)">
            <path d="M6 18h8" />
            <path d="M3.5 24a2 3 0 0 1 2-2h15a2 3 0 0 1 2 2v1H3.5Z" />
            <path d="M14 22a7 7 0 1 0 0-14h-1" />
            <path d="M9 14h2" />
            <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
            <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </g>
    </svg>
  );
}

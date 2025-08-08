'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function BiotiaLogo({ className, ...props }: BiotiaLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
      {...props}
    >
        <path d="M17 10h.01" />
        <path d="M10 14h.01" />
        <path d="m19 12-7-7-7 7" />
        <path d="M12 22V5" />
        <path d="M12 12H5.7c-.4 3.4-3 6.3-6.4 6.3" />
        <path d="M12 12h6.3c.4 3.4 3 6.3 6.4 6.3" />
    </svg>
  );
}

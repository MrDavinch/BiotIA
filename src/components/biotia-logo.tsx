'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps extends React.SVGProps<SVGSVGElement> {
  animated?: boolean;
}

export function BiotiaLogo({ className, animated = false, ...props }: BiotiaLogoProps) {
  const animationStyle = animated ? `
    .biotia-logo-path {
      stroke-dasharray: 400;
      stroke-dashoffset: 400;
      animation: draw-biotia-logo 2s ease-in-out forwards;
    }
    @keyframes draw-biotia-logo {
      to {
        stroke-dashoffset: 0;
      }
    }
  ` : '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("w-12 h-12 text-primary", className)}
      {...props}
    >
      {animated && <style>{animationStyle}</style>}
      <g className={animated ? "biotia-logo-path" : ""}>
        <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" stroke="currentColor" strokeWidth="4" />
        <path d="M 35 70 L 35 30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M 35 30 C 65 30, 65 50, 35 50" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M 35 50 C 70 50, 70 70, 35 70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

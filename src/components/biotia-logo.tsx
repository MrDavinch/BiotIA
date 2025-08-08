'use client';

import { cn } from "@/lib/utils";

interface BiotiaLogoProps extends React.SVGProps<SVGSVGElement> {
  animated?: boolean;
}

export function BiotiaLogo({ className, animated = false, ...props }: BiotiaLogoProps) {
  const animationStyle = animated ? `
    .biotia-logo-path-1 {
      stroke-dasharray: 283;
      stroke-dashoffset: 283;
      animation: draw-biotia-logo-1 1.5s ease-out forwards;
    }
    .biotia-logo-path-2 {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: draw-biotia-logo-2 1s ease-out 0.5s forwards;
    }
    .biotia-logo-path-3 {
       opacity: 0;
       animation: fade-in-biotia-logo 0.5s ease-out 1.5s forwards;
    }

    @keyframes draw-biotia-logo-1 {
      to {
        stroke-dashoffset: 0;
      }
    }
     @keyframes draw-biotia-logo-2 {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes fade-in-biotia-logo {
        to {
            opacity: 1;
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
      <g>
        <circle 
            className={animated ? "biotia-logo-path-1" : ""}
            cx="50" cy="50" r="45" 
            fill="hsl(var(--primary) / 0.1)" 
            stroke="currentColor" strokeWidth="4" 
        />
        <path 
            className={animated ? "biotia-logo-path-2" : ""}
            d="M30,70 V30 H55 C65,30 65,40 55,40 H30 M30,50 H55 C70,50 70,60 55,60 H30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
        />
        <path
            className={animated ? "biotia-logo-path-3" : ""}
            d="M75 70 L 75 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

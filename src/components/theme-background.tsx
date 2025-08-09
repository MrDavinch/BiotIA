'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ThemeBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'gradient';
}

/**
 * ThemeBackground wrapper component that applies dynamic theme-aware background styling
 * This component automatically adapts to the current Atlas theme context
 */
export function ThemeBackground({ 
  children, 
  className,
  variant = 'primary' 
}: ThemeBackgroundProps) {
  const baseClasses = 'transition-colors duration-500';
  
  const variantClasses = {
    primary: 'atlas-theme-background',
    secondary: 'atlas-theme-background-secondary', 
    gradient: 'atlas-theme-background-gradient'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}

/**
 * ThemeTitle component for theme-aware title styling
 */
interface ThemeTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function ThemeTitle({ 
  children, 
  className,
  as: Component = 'h1' 
}: ThemeTitleProps) {
  return (
    <Component className={cn('atlas-theme-title font-bold font-headline', className)}>
      {children}
    </Component>
  );
}

/**
 * ThemeText component for theme-aware text styling
 */
interface ThemeTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'accent' | 'muted';
}

export function ThemeText({ 
  children, 
  className,
  variant = 'primary' 
}: ThemeTextProps) {
  const variantClasses = {
    primary: 'atlas-theme-text',
    accent: 'atlas-theme-accent',
    muted: 'atlas-theme-muted'
  };

  return (
    <span className={cn(variantClasses[variant], className)}>
      {children}
    </span>
  );
}
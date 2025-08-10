'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAtlasTheme, useCurrentCategory } from '@/components/atlas-theme-provider';
import { BiotiaLogo } from '@/components/biotia-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Bot,
  ScanSearch,
  BookOpen,
  Users,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Chatbot IA', icon: Bot },
  { href: '/diagnostics', label: 'Diagnóstico por Imagen', icon: ScanSearch },
  { href: '/community', label: 'Casos Compartidos', icon: Users },
];

const atlasCategories = [
  { key: 'hematologia', name: 'Hematología', className: 'atlas-link-hematologia' },
  { key: 'parasitologia', name: 'Parasitología', className: 'atlas-link-parasitologia' },
  { key: 'micologia', name: 'Micología', className: 'atlas-link-micologia' },
  { key: 'bacteriologia', name: 'Bacteriología', className: 'atlas-link-bacteriologia' },
  { key: 'citologia-histologia', name: 'Citología', className: 'atlas-link-citologia-histologia' },
  { key: 'uroanalisis', name: 'Uroanálisis', className: 'atlas-link-uroanalisis' },
];

interface ThemedSidebarProps {
  isAtlasOpen: boolean;
  setIsAtlasOpen: (open: boolean) => void;
  hash: string;
}

export function ThemedSidebar({ isAtlasOpen, setIsAtlasOpen, hash }: ThemedSidebarProps) {
  const pathname = usePathname();
  const { currentTheme, isTransitioning, setTheme } = useAtlasTheme();
  const currentCategory = useCurrentCategory();

  // Handle Atlas link clicks
  const handleAtlasLinkClick = (category: string, event: React.MouseEvent) => {
    console.debug('Atlas link clicked:', category);
    
    // If we're already on the atlas page, just update the theme
    if (pathname === '/atlas') {
      event.preventDefault();
      setTheme(category as any, true);
    } else {
      // If we're navigating to atlas page, let Next.js handle the navigation
      // The theme will be updated by the hash change listener in the provider
      setTheme(category as any, false); // Don't update URL, let Next.js handle it
    }
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      {/* Header with themed logo */}
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 transition-colors duration-500">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
          <BiotiaLogo 
            className="h-8 w-8" 
            useThemeColor={pathname.startsWith('/atlas')}
          />
          <span className={cn(
            "transition-colors duration-500",
            pathname.startsWith('/atlas') ? "atlas-theme-text" : "text-foreground"
          )}>
            BiotIA
          </span>
        </Link>
        
        {/* Theme indicator */}
        {pathname.startsWith('/atlas') && (
          <div className="ml-auto flex items-center gap-2">
            <div 
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                isTransitioning && "animate-pulse"
              )}
              style={{ backgroundColor: currentTheme.colors.primary }}
              title={`Tema actual: ${currentTheme.name}`}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group hover:scale-105 hover:border hover:border-primary',
                { 'bg-muted text-primary': pathname === href }
              )}
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[15deg]" />
              {label}
            </Link>
          ))}
          
          {/* Atlas section with theme integration */}
          <Collapsible open={isAtlasOpen} onOpenChange={setIsAtlasOpen}>
            <CollapsibleTrigger asChild>
              <div className={cn(
                'flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group hover:scale-105 hover:border hover:border-primary cursor-pointer',
                { 
                  'bg-muted text-primary': pathname.startsWith('/atlas'),
                  'atlas-theme-border': pathname.startsWith('/atlas') && isAtlasOpen
                }
              )}>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[15deg]" />
                  <span className={cn(
                    "transition-colors duration-500",
                    pathname.startsWith('/atlas') && isAtlasOpen ? "atlas-theme-text font-semibold" : ""
                  )}>
                    Atlas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Active theme indicator */}
                  {pathname.startsWith('/atlas') && (
                    <div 
                      className="w-2 h-2 rounded-full transition-all duration-500"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    />
                  )}
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isAtlasOpen && "rotate-180",
                    pathname.startsWith('/atlas') ? "atlas-theme-accent" : "text-primary"
                  )} />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="py-1 pl-4 pr-2 space-y-2">
              {/* General Atlas link */}
              <Link 
                href="/atlas#general"
                onClick={(e) => handleAtlasLinkClick('general', e)}
                className={cn(
                  'atlas-link atlas-link-principal transition-all duration-500',
                  { 
                    'border-2 scale-105': currentCategory === 'general' && pathname === '/atlas',
                    'atlas-theme-shadow': currentCategory === 'general' && pathname === '/atlas'
                  }
                )}
              >
                <div className="flex items-center justify-between">
                  <span>General</span>
                  {currentCategory === 'general' && pathname === '/atlas' && (
                    <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                  )}
                </div>
              </Link>
              
              {/* Specialty Atlas links */}
              {atlasCategories.map(category => {
                const isCurrentTheme = currentCategory === category.key;
                
                return (
                  <Link 
                    key={category.key} 
                    href={`/atlas#${category.key}`}
                    onClick={(e) => handleAtlasLinkClick(category.key, e)}
                    className={cn(
                      "atlas-link transition-all duration-500",
                      category.className,
                      { 
                        'border-2 scale-105': isCurrentTheme && pathname === '/atlas',
                        'atlas-theme-shadow': isCurrentTheme && pathname === '/atlas',
                        'ring-2 ring-white/30': isCurrentTheme && pathname === '/atlas'
                      }
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <div className="flex items-center gap-1">
                        {/* Single unified indicator - only show when this is the current theme */}
                        {isCurrentTheme && pathname === '/atlas' && (
                          <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>

      {/* Settings link */}
      <div className="mt-auto p-4">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group',
            { 'bg-muted text-primary': pathname === '/settings' }
          )}
        >
          <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          Configuración
        </Link>
      </div>
    </div>
  );
}
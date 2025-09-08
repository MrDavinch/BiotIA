'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AtlasThemeProvider, useAtlasTheme } from '@/components/atlas-theme-provider';
import {
  Bell,
  Home,
  Bot,
  ScanSearch,
  BookOpen,
  Users,
  Settings,
  CircleUser,
  PanelLeft,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BiotiaLogo } from '@/components/biotia-logo';
import { ThemedSidebar } from '@/components/themed-sidebar';
import { Footer } from '@/components/footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Main layout content component that consumes theme context
function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentTheme } = useAtlasTheme();
  const [isAtlasOpen, setIsAtlasOpen] = React.useState(false);
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash;
      setHash(newHash);
      if (newHash.startsWith('#')) {
         setIsAtlasOpen(true);
      }
    }
    
    setHash(window.location.hash);
    
    if (pathname.startsWith('/atlas')) {
      setIsAtlasOpen(true);
    }

    window.addEventListener('hashchange', onHashChange, false);
    return () => {
      window.removeEventListener('hashchange', onHashChange, false);
    };
  }, [pathname]);



  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden border-r md:block transition-colors duration-500",
        pathname.startsWith('/atlas') 
          ? "atlas-theme-background-secondary" 
          : "bg-card"
      )}
      style={pathname.startsWith('/atlas') ? {
        backgroundColor: currentTheme.colors.backgroundSecondary
      } : undefined}
      >
        <ThemedSidebar 
          isAtlasOpen={isAtlasOpen}
          setIsAtlasOpen={setIsAtlasOpen}
          hash={hash}
        />
      </div>
      <div className="flex flex-col min-h-screen">
        <header className={cn(
          "flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 transition-colors duration-500",
          pathname.startsWith('/atlas') 
            ? "atlas-theme-background-secondary" 
            : "bg-card"
        )}
        style={pathname.startsWith('/atlas') ? {
          backgroundColor: currentTheme.colors.backgroundSecondary
        } : undefined}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <ThemedSidebar 
                  isAtlasOpen={isAtlasOpen}
                  setIsAtlasOpen={setIsAtlasOpen}
                  hash={hash}
                />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Optional: Add search bar here */}
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full h-9 w-9">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/profile">Ver Perfil</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/settings">Ajustes</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/login">Cerrar Sesión</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main 
          className={cn(
            "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 transition-colors duration-500",
            pathname.startsWith('/atlas') 
              ? "atlas-theme-background" 
              : "bg-background"
          )}
          style={pathname.startsWith('/atlas') ? {
            backgroundColor: currentTheme.colors.background
          } : undefined}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Main layout wrapper with theme provider
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AtlasThemeProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </AtlasThemeProvider>
  );
}

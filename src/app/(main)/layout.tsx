'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Chatbot IA', icon: Bot },
  { href: '/diagnostics', label: 'Diagnóstico por Imagen', icon: ScanSearch },
  { href: '/community', label: 'Casos Compartidos', icon: Users },
];

const atlasCategories = [
    { key: 'hematologia', name: 'Hematología', className: 'atlas-link-hematologia' },
    { key: 'parasitologia', name: 'Parasitología / Copro', className: 'atlas-link-parasitologia' },
    { key: 'micologia', name: 'Micología', className: 'atlas-link-micologia' },
    { key: 'bacteriologia', name: 'Bacteriología', className: 'atlas-link-bacteriologia' },
    { key: 'citologia-histologia', name: 'Citología / Histología', className: 'atlas-link-citologia-histologia' },
    { key: 'uroanalisis', name: 'Uroanálisis', className: 'atlas-link-uroanalisis' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAtlasOpen, setIsAtlasOpen] = React.useState(pathname.startsWith('/atlas'));
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    
    setHash(window.location.hash);

    if (pathname.startsWith('/atlas')) {
      setIsAtlasOpen(true);
    }

    window.addEventListener('hashchange', onHashChange, false);
    return () => {
      window.removeEventListener('hashchange', onHashChange, false);
    };
  }, [pathname]);

  const sidebarNav = (
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
      
      <Collapsible open={isAtlasOpen} onOpenChange={setIsAtlasOpen}>
        <CollapsibleTrigger asChild>
           <div className={cn(
                'flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group hover:scale-105 hover:border hover:border-primary cursor-pointer',
                 { 'bg-muted text-primary': pathname.startsWith('/atlas') }
            )}>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[15deg]" />
                Atlas
              </div>
              <ChevronDown className={cn("h-5 w-5 text-primary transition-transform", isAtlasOpen && "rotate-180")} />
           </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-1 pl-4 pr-2 space-y-2">
            <Link href="/atlas"  className={cn(
                'atlas-link atlas-link-principal',
                 { 'border-2 border-foreground': (pathname === '/atlas' && !hash) }
              )}>
                  Página Principal
              </Link>
            {atlasCategories.map(category => (
              <Link key={category.key} href={`/atlas#${category.key}`} className={cn(
                "atlas-link",
                category.className,
                 { 'border-2 border-foreground': hash === `#${category.key}` }
              )}>
                {category.name}
              </Link>
            ))}
        </CollapsibleContent>
      </Collapsible>

    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
              <BiotiaLogo className="h-8 w-8 text-primary" />
              <span className="">BiotIA</span>
            </Link>
          </div>
          <div className="flex-1">
            {sidebarNav}
          </div>
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
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
                    <BiotiaLogo className="h-8 w-8 text-primary" />
                    <span className="">BiotIA</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                    {sidebarNav}
                </div>
                 <div className="mt-auto p-4 border-t">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="h-5 w-5" />
                        Configuración
                    </Link>
                </div>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client'

import * as React from 'react';
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

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Chatbot IA', icon: Bot },
  { href: '/diagnostics', label: 'Diagnóstico por Imagen', icon: ScanSearch },
  { href: '/atlas', label: 'Atlas', icon: BookOpen },
  { href: '/community', label: 'Casos Compartidos', icon: Users },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
              <BiotiaLogo className="h-8 w-8" />
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
            <SheetContent side="left" className="flex flex-col">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
                    <BiotiaLogo className="h-8 w-8" />
                    <span className="">BiotIA</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {sidebarNav}
                </div>
                 <div className="mt-auto p-4">
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

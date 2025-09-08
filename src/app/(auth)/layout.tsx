import React from 'react';
import Link from 'next/link';
import { BiotiaLogo } from '@/components/biotia-logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>
      
      {/* Simple Footer for Auth Pages */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <BiotiaLogo className="h-6 w-6" />
              <span className="text-lg font-bold">BiotIA Pro</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {currentYear} BiotIA Pro. Todos los derechos reservados.
            </div>
            <div className="flex space-x-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidad
              </Link>
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Términos
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAtlasTheme } from '@/components/atlas-theme-provider';
import { BiotiaLogo } from '@/components/biotia-logo';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export function Footer() {
    const pathname = usePathname();
    const { currentTheme } = useAtlasTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "border-t mt-auto transition-colors duration-500",
                pathname.startsWith('/atlas')
                    ? "atlas-theme-background-secondary"
                    : "bg-card"
            )}
            style={pathname.startsWith('/atlas') ? {
                backgroundColor: currentTheme.colors.backgroundSecondary
            } : undefined}
        >
            <div className="container mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <BiotiaLogo className="h-8 w-8" />
                            <span className="text-xl font-bold">BiotIA</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Bioanálisis impulsado por IA para profesionales de laboratorio.
                            Transformando la biotecnología con inteligencia artificial avanzada.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://linkedin.com/company/biotia"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                href="https://twitter.com/biotia"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://github.com/biotia"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>

                    {/* Products & Services */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Productos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/atlas" className="text-muted-foreground hover:text-primary transition-colors">
                                    Atlas IA
                                </Link>
                            </li>
                            <li>
                                <Link href="/analysis" className="text-muted-foreground hover:text-primary transition-colors">
                                    Análisis de Muestras
                                </Link>
                            </li>
                            <li>
                                <Link href="/reports" className="text-muted-foreground hover:text-primary transition-colors">
                                    Reportes Automatizados
                                </Link>
                            </li>
                            <li>
                                <Link href="/integrations" className="text-muted-foreground hover:text-primary transition-colors">
                                    Integraciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Resources */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Soporte</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                                    Documentación
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                                    Centro de Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="/training" className="text-muted-foreground hover:text-primary transition-colors">
                                    Capacitación
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Contacto</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>contacto@biotia.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Ciudad de México, México</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-muted-foreground">
                            © {currentYear} BiotIA Pro. Todos los derechos reservados.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link
                                href="/privacy"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Política de Privacidad
                            </Link>
                            <Link
                                href="/terms"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Términos de Servicio
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Política de Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
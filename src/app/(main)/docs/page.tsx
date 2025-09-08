import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentación</h1>
        <p className="text-lg text-muted-foreground">
          Todo lo que necesitas saber para usar BiotIA Pro de manera efectiva
        </p>
      </div>

      {/* Getting Started */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Inicio Rápido</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Configuración Inicial</h3>
              <p className="text-sm text-muted-foreground">
                Configura tu perfil y preferencias de laboratorio
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Primera Muestra</h3>
              <p className="text-sm text-muted-foreground">
                Sube y analiza tu primera muestra con IA
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Interpretar Resultados</h3>
              <p className="text-sm text-muted-foreground">
                Comprende y actúa sobre los análisis generados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Guía del Usuario</CardTitle>
              </div>
              <Badge variant="secondary">Básico</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Aprende los conceptos fundamentales y funcionalidades principales de BiotIA Pro.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Navegación de la interfaz</li>
              <li>• Gestión de muestras</li>
              <li>• Interpretación de resultados</li>
              <li>• Generación de reportes</li>
            </ul>
            <Button variant="outline" className="w-full">
              Leer Guía <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>API Reference</CardTitle>
              </div>
              <Badge variant="secondary">Avanzado</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Documentación técnica completa para integraciones y desarrollo.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Endpoints de API REST</li>
              <li>• Autenticación y seguridad</li>
              <li>• Webhooks y notificaciones</li>
              <li>• SDKs y librerías</li>
            </ul>
            <Button variant="outline" className="w-full">
              Ver API Docs <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Seguridad y Compliance</CardTitle>
              </div>
              <Badge variant="secondary">Importante</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Información sobre seguridad, privacidad y cumplimiento regulatorio.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Certificaciones HIPAA</li>
              <li>• Encriptación de datos</li>
              <li>• Auditorías de seguridad</li>
              <li>• Políticas de retención</li>
            </ul>
            <Button variant="outline" className="w-full">
              Ver Políticas <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Gestión de Equipos</CardTitle>
              </div>
              <Badge variant="secondary">Empresarial</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Administra usuarios, permisos y configuraciones organizacionales.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Roles y permisos</li>
              <li>• Configuración de laboratorio</li>
              <li>• Flujos de trabajo personalizados</li>
              <li>• Reportes administrativos</li>
            </ul>
            <Button variant="outline" className="w-full">
              Gestionar Equipo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recursos Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Tutoriales en Video</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Aprende visualmente con nuestros tutoriales paso a paso
              </p>
              <Button variant="link" className="p-0 h-auto">
                Ver Videos →
              </Button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Casos de Estudio</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Ejemplos reales de implementación exitosa
              </p>
              <Button variant="link" className="p-0 h-auto">
                Leer Casos →
              </Button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Comunidad</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Conecta con otros usuarios y expertos
              </p>
              <Button variant="link" className="p-0 h-auto">
                Unirse →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
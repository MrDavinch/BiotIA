import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock, Users, Award, PlayCircle, BookOpen } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Capacitación BiotIA Pro</h1>
        <p className="text-lg text-muted-foreground">
          Programas de entrenamiento diseñados para maximizar tu productividad con BiotIA Pro
        </p>
      </div>

      {/* Training Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Básico</Badge>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Fundamentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Aprende los conceptos básicos y primeros pasos con BiotIA Pro.
            </p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>Duración: 2 horas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3" />
                <span>Modalidad: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-3 w-3" />
                <span>Certificado incluido</span>
              </div>
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Navegación de la interfaz</li>
              <li>• Carga de muestras</li>
              <li>• Interpretación básica</li>
              <li>• Generación de reportes</li>
            </ul>
            <Button className="w-full">
              <PlayCircle className="h-4 w-4 mr-2" />
              Comenzar Curso
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="default">Intermedio</Badge>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Análisis Avanzado</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Domina técnicas avanzadas de análisis e interpretación de resultados.
            </p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>Duración: 4 horas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3" />
                <span>Modalidad: Híbrida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-3 w-3" />
                <span>Certificado profesional</span>
              </div>
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Análisis comparativo</li>
              <li>• Configuración de alertas</li>
              <li>• Flujos de trabajo personalizados</li>
              <li>• Integración con LIMS</li>
            </ul>
            <Button className="w-full">
              <PlayCircle className="h-4 w-4 mr-2" />
              Comenzar Curso
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="destructive">Experto</Badge>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Administración</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gestión completa de equipos, configuraciones y optimización del sistema.
            </p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>Duración: 6 horas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3" />
                <span>Modalidad: Presencial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-3 w-3" />
                <span>Certificado de especialista</span>
              </div>
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Gestión de usuarios y permisos</li>
              <li>• Configuración avanzada</li>
              <li>• Optimización de rendimiento</li>
              <li>• Integración empresarial</li>
            </ul>
            <Button className="w-full">
              <PlayCircle className="h-4 w-4 mr-2" />
              Comenzar Curso
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Custom Training */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Capacitación Personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Entrenamiento Empresarial</h3>
              <p className="text-muted-foreground mb-4">
                Programas diseñados específicamente para las necesidades de tu organización.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Sesiones en sitio o remotas</li>
                <li>• Contenido adaptado a tu flujo de trabajo</li>
                <li>• Soporte post-entrenamiento</li>
                <li>• Certificaciones grupales</li>
              </ul>
              <Button variant="outline">
                Solicitar Cotización
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Mentoría Individual</h3>
              <p className="text-muted-foreground mb-4">
                Sesiones uno-a-uno con expertos para casos específicos.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Sesiones de 1 hora</li>
                <li>• Enfoque en casos reales</li>
                <li>• Seguimiento personalizado</li>
                <li>• Acceso directo a especialistas</li>
              </ul>
              <Button variant="outline">
                Agendar Sesión
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recursos de Aprendizaje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Biblioteca de Recursos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manuales, guías y documentación técnica
              </p>
              <Button variant="link" className="p-0 h-auto">
                Explorar Biblioteca →
              </Button>
            </div>
            
            <div className="text-center">
              <PlayCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Videos Tutoriales</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contenido visual paso a paso
              </p>
              <Button variant="link" className="p-0 h-auto">
                Ver Videos →
              </Button>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Comunidad</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Foros y grupos de usuarios
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
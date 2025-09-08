import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, MessageCircle, Video, FileText, Users } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Encuentra respuestas rápidas y recursos para aprovechar al máximo BiotIA Pro
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar en la ayuda..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Documentación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-4">
              Guías completas y referencias técnicas para usar BiotIA Pro
            </p>
            <Button variant="outline" className="w-full">
              Ver Documentación
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Video className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Tutoriales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-4">
              Videos paso a paso para dominar todas las funcionalidades
            </p>
            <Button variant="outline" className="w-full">
              Ver Tutoriales
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Chat en Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-4">
              Habla directamente con nuestro equipo de soporte
            </p>
            <Button variant="outline" className="w-full">
              Iniciar Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Cómo empiezo a usar BiotIA Pro?</h3>
              <p className="text-muted-foreground">
                Después de crear tu cuenta, puedes comenzar subiendo tus primeras muestras 
                en la sección de Análisis. Nuestro asistente te guiará paso a paso.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Qué tipos de muestras puedo analizar?</h3>
              <p className="text-muted-foreground">
                BiotIA Pro soporta una amplia variedad de muestras biológicas incluyendo 
                sangre, orina, tejidos, y cultivos microbiológicos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Cómo interpreto los resultados?</h3>
              <p className="text-muted-foreground">
                Cada análisis incluye interpretaciones automáticas y recomendaciones. 
                También puedes consultar con nuestros especialistas para casos complejos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Los datos están seguros?</h3>
              <p className="text-muted-foreground">
                Sí, utilizamos encriptación de grado militar y cumplimos con todas las 
                regulaciones de privacidad médica incluyendo HIPAA.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">¿Necesitas más ayuda?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Soporte Técnico</h3>
                <p className="text-muted-foreground">soporte@biotia.com</p>
                <p className="text-muted-foreground">+1 (555) 123-4568</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Recursos Adicionales</h3>
                <p className="text-muted-foreground">Manuales, guías y mejores prácticas</p>
                <Button variant="link" className="p-0 h-auto">
                  Descargar Recursos
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
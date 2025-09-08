import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Microscope, BarChart3, FileText, Clock, CheckCircle } from 'lucide-react';

export default function AnalysisPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Análisis de Muestras</h1>
        <p className="text-lg text-muted-foreground">
          Análisis inteligente impulsado por IA para resultados precisos y rápidos
        </p>
      </div>

      {/* Analysis Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Proceso de Análisis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Carga de Muestra</h3>
              <p className="text-sm text-muted-foreground">
                Sube tus muestras de forma segura con metadatos completos
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Microscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Análisis IA</h3>
              <p className="text-sm text-muted-foreground">
                Nuestros algoritmos procesan y analizan automáticamente
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Resultados</h3>
              <p className="text-sm text-muted-foreground">
                Obtén resultados detallados con interpretaciones
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4. Reporte</h3>
              <p className="text-sm text-muted-foreground">
                Genera reportes profesionales listos para usar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Análisis Hematológico</CardTitle>
              <Badge variant="secondary">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Análisis completo de muestras sanguíneas con conteo celular y morfología.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Hemograma completo</li>
              <li>• Morfología celular</li>
              <li>• Detección de anomalías</li>
              <li>• Análisis de coagulación</li>
            </ul>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>Tiempo promedio: 15 minutos</span>
            </div>
            <Button className="w-full">Iniciar Análisis</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Microbiología</CardTitle>
              <Badge variant="secondary">Avanzado</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Identificación y análisis de microorganismos con pruebas de sensibilidad.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Identificación bacteriana</li>
              <li>• Antibiograma</li>
              <li>• Detección de resistencias</li>
              <li>• Análisis de biofilms</li>
            </ul>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>Tiempo promedio: 30 minutos</span>
            </div>
            <Button className="w-full">Iniciar Análisis</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Química Clínica</CardTitle>
              <Badge variant="secondary">Rápido</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Análisis bioquímico completo con marcadores específicos.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Perfil metabólico</li>
              <li>• Marcadores cardíacos</li>
              <li>• Función renal y hepática</li>
              <li>• Análisis hormonal</li>
            </ul>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>Tiempo promedio: 10 minutos</span>
            </div>
            <Button className="w-full">Iniciar Análisis</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Análisis Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Muestra #HEM-2024-001</h3>
                  <p className="text-sm text-muted-foreground">Análisis Hematológico - Completado</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Hace 2 horas</p>
                <Button variant="outline" size="sm">Ver Resultados</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Microscope className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Muestra #MIC-2024-045</h3>
                  <p className="text-sm text-muted-foreground">Microbiología - En proceso</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Hace 1 hora</p>
                <Button variant="outline" size="sm">Ver Estado</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Muestra #QUI-2024-123</h3>
                  <p className="text-sm text-muted-foreground">Química Clínica - Completado</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Hace 3 horas</p>
                <Button variant="outline" size="sm">Ver Resultados</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="lg" className="h-16">
              <Upload className="h-6 w-6 mr-2" />
              Nueva Muestra
            </Button>
            <Button variant="outline" size="lg" className="h-16">
              <BarChart3 className="h-6 w-6 mr-2" />
              Ver Estadísticas
            </Button>
            <Button variant="outline" size="lg" className="h-16">
              <FileText className="h-6 w-6 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, Share2, Filter, Search, Calendar, BarChart3, PieChart } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reportes Automatizados</h1>
          <p className="text-lg text-muted-foreground">
            Genera reportes profesionales y personalizados de tus análisis
          </p>
        </div>
        <Button size="lg">
          <FileText className="h-5 w-5 mr-2" />
          Nuevo Reporte
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar reportes..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Fecha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Reporte Hematológico</span>
              </CardTitle>
              <Badge variant="secondary">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Reporte completo de análisis sanguíneos con gráficos y tendencias.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Hemograma completo</li>
              <li>• Análisis morfológico</li>
              <li>• Tendencias temporales</li>
              <li>• Valores de referencia</li>
            </ul>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Generar</Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Análisis Microbiológico</span>
              </CardTitle>
              <Badge variant="secondary">Detallado</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Identificación de microorganismos con antibiograma y recomendaciones.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Identificación bacteriana</li>
              <li>• Perfil de sensibilidad</li>
              <li>• Recomendaciones terapéuticas</li>
              <li>• Análisis de resistencias</li>
            </ul>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Generar</Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Química Clínica</span>
              </CardTitle>
              <Badge variant="secondary">Rápido</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Perfil bioquímico completo con interpretación clínica.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Perfil metabólico básico</li>
              <li>• Marcadores específicos</li>
              <li>• Interpretación clínica</li>
              <li>• Valores críticos</li>
            </ul>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Generar</Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Reportes Recientes</CardTitle>
            <Button variant="outline" size="sm">Ver Todos</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Reporte Mensual - Enero 2024</h3>
                  <p className="text-sm text-muted-foreground">Análisis Hematológico • 45 muestras</p>
                  <p className="text-xs text-muted-foreground">Generado hace 2 horas</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Análisis de Tendencias Q4 2023</h3>
                  <p className="text-sm text-muted-foreground">Microbiología • 128 muestras</p>
                  <p className="text-xs text-muted-foreground">Generado hace 1 día</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Reporte de Calidad - Diciembre</h3>
                  <p className="text-sm text-muted-foreground">Química Clínica • 89 muestras</p>
                  <p className="text-xs text-muted-foreground">Generado hace 3 días</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">247</div>
              <p className="text-sm text-muted-foreground">Reportes Generados</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
              <p className="text-sm text-muted-foreground">Muestras Analizadas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
              <p className="text-sm text-muted-foreground">Precisión Promedio</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12min</div>
              <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
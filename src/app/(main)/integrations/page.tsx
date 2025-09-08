import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plug, Database, Cloud, Zap, Settings, CheckCircle, AlertCircle } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Integraciones</h1>
        <p className="text-lg text-muted-foreground">
          Conecta BiotIA Pro con tus sistemas existentes para un flujo de trabajo optimizado
        </p>
      </div>

      {/* Integration Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Database className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Sistemas LIMS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Integración directa con sistemas de gestión de información de laboratorio
            </p>
            <Badge variant="secondary">12 integraciones disponibles</Badge>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Servicios en la Nube</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Conecta con plataformas de almacenamiento y análisis en la nube
            </p>
            <Badge variant="secondary">8 integraciones disponibles</Badge>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>APIs y Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Automatización personalizada con APIs REST y notificaciones
            </p>
            <Badge variant="secondary">Ilimitadas</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Popular Integrations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Integraciones Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">LabWare LIMS</h3>
                  <p className="text-sm text-muted-foreground">Sistema de gestión de laboratorio</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Conectado</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked />
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Cloud className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AWS S3</h3>
                  <p className="text-sm text-muted-foreground">Almacenamiento en la nube</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Conectado</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked />
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Slack</h3>
                  <p className="text-sm text-muted-foreground">Notificaciones en tiempo real</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-orange-600">Configuración pendiente</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <Database className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Epic MyChart</h3>
                  <p className="text-sm text-muted-foreground">Sistema de registros médicos</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Conectado</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked />
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Integraciones Disponibles</CardTitle>
            <Button>
              <Plug className="h-4 w-4 mr-2" />
              Explorar Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 rounded p-2">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Cerner PowerChart</h3>
                  <Badge variant="outline" className="text-xs">LIMS</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Integración con sistema hospitalario Cerner
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Conectar
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-100 rounded p-2">
                  <Cloud className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Google Cloud Storage</h3>
                  <Badge variant="outline" className="text-xs">Cloud</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Almacenamiento seguro en Google Cloud
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Conectar
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-orange-100 rounded p-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Microsoft Teams</h3>
                  <Badge variant="outline" className="text-xs">Comunicación</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Notificaciones y colaboración en Teams
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Conectar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Integración Personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">API REST</h3>
              <p className="text-muted-foreground mb-4">
                Utiliza nuestra API REST completa para crear integraciones personalizadas.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Endpoints para todas las funcionalidades</li>
                <li>• Autenticación OAuth 2.0</li>
                <li>• Documentación completa</li>
                <li>• SDKs en múltiples lenguajes</li>
              </ul>
              <Button variant="outline">
                Ver Documentación API
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
              <p className="text-muted-foreground mb-4">
                Recibe notificaciones en tiempo real sobre eventos importantes.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Análisis completados</li>
                <li>• Resultados críticos</li>
                <li>• Errores del sistema</li>
                <li>• Actualizaciones de estado</li>
              </ul>
              <Button variant="outline">
                Configurar Webhooks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Política de Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">¿Qué son las Cookies?</h2>
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
              visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia y proporcionar 
              funcionalidades personalizadas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tipos de Cookies que Utilizamos</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Cookies Esenciales</h3>
              <p className="mb-2">
                Estas cookies son necesarias para el funcionamiento básico del sitio web:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Autenticación de sesión</li>
                <li>Preferencias de seguridad</li>
                <li>Funcionalidad del carrito de compras</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Cookies de Rendimiento</h3>
              <p className="mb-2">
                Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Análisis de tráfico web</li>
                <li>Métricas de rendimiento</li>
                <li>Identificación de errores</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Cookies de Funcionalidad</h3>
              <p className="mb-2">
                Permiten recordar tus preferencias y personalizar tu experiencia:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Configuración de idioma</li>
                <li>Preferencias de tema</li>
                <li>Configuraciones de dashboard</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Gestión de Cookies</h2>
            <p className="mb-4">
              Puedes controlar y gestionar las cookies de varias maneras:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>A través de la configuración de tu navegador</li>
              <li>Usando nuestro centro de preferencias de cookies</li>
              <li>Mediante herramientas de terceros</li>
            </ul>
            <p className="mb-4">
              Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad 
              del sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies de Terceros</h2>
            <p className="mb-4">
              Algunos de nuestros socios pueden establecer cookies en nuestro sitio web:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics (análisis web)</li>
              <li>Servicios de chat en vivo</li>
              <li>Integraciones de redes sociales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
            <p>
              Si tienes preguntas sobre nuestra política de cookies, contáctanos en: 
              <a href="mailto:privacy@biotia.com" className="text-primary hover:underline ml-1">
                privacy@biotia.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Términos de Servicio</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de Términos</h2>
            <p className="mb-4">
              Al acceder y utilizar BiotIA Pro, aceptas estar sujeto a estos términos de servicio 
              y todas las leyes y regulaciones aplicables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
            <p className="mb-4">
              BiotIA Pro proporciona servicios de análisis de laboratorio impulsados por inteligencia 
              artificial para profesionales de la biotecnología y laboratorios clínicos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Responsabilidades del Usuario</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Proporcionar información precisa y actualizada</li>
              <li>Mantener la confidencialidad de las credenciales de acceso</li>
              <li>Usar el servicio de acuerdo con las regulaciones aplicables</li>
              <li>No interferir con el funcionamiento del servicio</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitación de Responsabilidad</h2>
            <p className="mb-4">
              BiotIA Pro proporciona herramientas de análisis como apoyo a la toma de decisiones. 
              Los resultados deben ser interpretados por profesionales calificados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Modificaciones</h2>
            <p className="mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán notificados a través de la plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
            <p>
              Para preguntas sobre estos términos, contáctanos en: 
              <a href="mailto:legal@biotia.com" className="text-primary hover:underline ml-1">
                legal@biotia.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
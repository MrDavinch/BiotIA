import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
            <p className="mb-4">
              En BiotIA Pro, recopilamos información necesaria para proporcionar nuestros servicios de análisis 
              de laboratorio impulsados por IA. Esto incluye:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Información de cuenta (nombre, email, organización)</li>
              <li>Datos de muestras de laboratorio (anonimizados)</li>
              <li>Información de uso de la plataforma</li>
              <li>Datos técnicos para mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
            <p className="mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Proporcionar análisis precisos y personalizados</li>
              <li>Mejorar nuestros algoritmos de IA</li>
              <li>Comunicarnos contigo sobre tu cuenta y servicios</li>
              <li>Cumplir con requisitos legales y regulatorios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Protección de Datos</h2>
            <p className="mb-4">
              Implementamos medidas de seguridad robustas para proteger tu información, incluyendo 
              encriptación de datos, acceso restringido y auditorías regulares de seguridad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, contáctanos en: 
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
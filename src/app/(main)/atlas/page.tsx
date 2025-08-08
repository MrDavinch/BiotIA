'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { atlasData } from "@/lib/data";
import { cn } from "@/lib/utils";

type Category = keyof typeof atlasData;

const categories = [
    { key: 'micologia', name: 'Micología' },
    { key: 'parasitologia', name: 'Parasitología' },
    { key: 'bacteriologia', name: 'Bacteriología' },
    { key: 'hematologia', name: 'Hematología' },
    { key: 'uroanalisis', name: 'Uroanálisis' },
    { key: 'coproanalisis', name: 'Coproanálisis' },
    { key: 'citologia-histologia', name: 'Citología / Histología' },
];

export default function AtlasPage() {
  const [activeTab, setActiveTab] = useState<string>('micologia');
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && categories.some(c => c.key === hash)) {
      setActiveTab(hash);
      const element = tabRefs.current[hash];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
     // Set theme on initial load
    document.body.className = `theme-${activeTab}`;
  }, []);

  useEffect(() => {
    document.body.className = `theme-${activeTab}`;
  }, [activeTab]);


  const handleTabChange = (value: string) => {
    setActiveTab(value);
  }

  return (
    <div className={cn("flex flex-col")}>
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline">Atlas Educativo</h1>
        <p className="text-muted-foreground">
          Explora el banco de imágenes y las guías visuales.
        </p>
      </div>

      <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent dark:from-background to-transparent h-8 -bottom-4" />
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-2">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {categories.map(cat => (
                <TabsTrigger key={cat.key} value={cat.key}>{cat.name}</TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className={cn("p-4 rounded-b-lg transition-colors bg-card/50")}>
          {categories.map(cat => (
            <TabsContent key={cat.key} value={cat.key} id={cat.key} ref={el => tabRefs.current[cat.key] = el}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(atlasData[cat.key as Category] || []).map((item) => (
                  <Card key={item.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <CardContent className="p-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.species}
                        width={400}
                        height={400}
                        className="aspect-square object-cover w-full transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={item.aiHint}
                      />
                    </CardContent>
                    <CardFooter className="flex-col items-start p-4 text-sm">
                      <p className="font-bold">{item.species}</p>
                      <p className="text-muted-foreground">{item.staining}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.magnification} por {item.author}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

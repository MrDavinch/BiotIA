
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { atlasData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CategoryKey = keyof typeof atlasData;

const categoryInfo: Record<CategoryKey, { title: string; className: string }> = {
    general: { title: 'Atlas General', className: 'bg-teal-50' },
    hematologia: { title: 'Atlas de Hematología', className: 'bg-red-50' },
    parasitologia: { title: 'Atlas de Parasitología', className: 'bg-amber-50' },
    micologia: { title: 'Atlas de Micología', className: 'bg-blue-50' },
    bacteriologia: { title: 'Atlas de Bacteriología', className: 'bg-violet-50' },
    'citologia-histologia': { title: 'Atlas de Citología / Histología', className: 'bg-pink-50' },
    uroanalisis: { title: 'Atlas de Uroanálisis', className: 'bg-yellow-50' },
};

export default function AtlasPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('general');
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) as CategoryKey;
      if (hash && hash in atlasData) {
        setActiveCategory(hash);
      } else {
        setActiveCategory('general');
      }
    };

    handleHashChange(); // Set initial category based on hash
    
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, [pathname]);

  const { title: pageTitle, className: backgroundClass } = categoryInfo[activeCategory] || categoryInfo.general;
  const pageDescription = `Explora el banco de imágenes y las guías visuales para ${pageTitle.replace('Atlas de ', '')}.`;
  const currentItems = atlasData[activeCategory] || [];
  
  if (!isClient) {
    return (
        <div className="flex flex-col">
            <div className="mb-8">
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {[...Array(8)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-0">
                             <Skeleton className="w-full h-64" />
                        </CardContent>
                        <CardFooter className="flex-col items-start p-4 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-3 w-1/3" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className={cn("flex flex-col p-6 rounded-lg transition-colors duration-500", backgroundClass)}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">{pageTitle}</h1>
        <p className="text-muted-foreground">
          {pageDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card/80 backdrop-blur-sm">
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
    </div>
  );
}


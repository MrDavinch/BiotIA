
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { atlasData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAtlasTheme } from "@/components/atlas-theme-provider";
import { ThemeBackground, ThemeTitle, ThemeText } from "@/components/theme-background";

type CategoryKey = keyof typeof atlasData;

export default function AtlasPage() {
  const [isClient, setIsClient] = useState(false);
  
  // Use the Atlas theme context instead of local state
  const { currentTheme } = useAtlasTheme();
  const activeCategory = currentTheme.category;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Force re-render when theme changes
  useEffect(() => {
    // This effect will run whenever currentTheme changes
    // ensuring the component updates with new theme data
    console.debug('Atlas page theme changed:', {
      category: activeCategory,
      themeName: currentTheme.name,
      itemCount: atlasData[activeCategory]?.length || 0
    });
  }, [currentTheme, activeCategory]);

  const pageTitle = currentTheme.name;
  const pageDescription = `Explora el banco de imágenes y las guías visuales para ${pageTitle.replace('Atlas de ', '').replace('Atlas ', '')}.`;
  const currentItems = atlasData[activeCategory] || [];
  
  if (!isClient) {
    return (
        <ThemeBackground className="flex flex-col p-6 rounded-lg">
            <div className="mb-8">
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <Card key={i} className="atlas-theme-card">
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
        </ThemeBackground>
    );
  }

  return (
    <ThemeBackground key={activeCategory} className="flex flex-col p-6 rounded-lg atlas-theme-fade-in">
      <div className="mb-8">
        <ThemeTitle className="text-3xl mb-2">
          {pageTitle}
        </ThemeTitle>
        <ThemeText variant="muted" className="text-base">
          {pageDescription}
        </ThemeText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
            <Card key={item.id} className="atlas-theme-card overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm">
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
                <ThemeText className="font-bold text-sm">
                  {item.species}
                </ThemeText>
                <ThemeText variant="muted" className="text-sm">
                  {item.staining}
                </ThemeText>
                <ThemeText variant="muted" className="text-xs">
                  {item.magnification} por {item.author}
                </ThemeText>
            </CardFooter>
            </Card>
        ))}
      </div>
    </ThemeBackground>
  );
}


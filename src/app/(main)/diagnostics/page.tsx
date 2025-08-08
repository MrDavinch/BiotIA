'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Loader2, Wand2, FlaskConical, Microscope, Beaker } from "lucide-react";
import type { ImageAnalysisOutput } from "@/ai/flows/image-analysis-diagnostic-suggestion";
import { analyzeImageForDiagnosis } from "@/ai/flows/image-analysis-diagnostic-suggestion";
import { useToast } from "@/hooks/use-toast";

export default function DiagnosticsPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImageAnalysisOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error: Archivo demasiado grande",
          description: "Por favor, suba una imagen de menos de 4MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(URL.createObjectURL(file));
        setImageDataUri(dataUri);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageDataUri) {
      toast({
          variant: "destructive",
          title: "Error",
          description: "Por favor, suba una imagen primero.",
        });
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const sampleType = formData.get("sampleType") as string;
    const objective = formData.get("objective") as string;
    const staining = formData.get("staining") as string;
    
    try {
      const analysisResult = await analyzeImageForDiagnosis({
        imageDataUri,
        sampleType,
        objective,
        staining,
      });
      setResult(analysisResult);
    } catch (error) {
       toast({
          variant: "destructive",
          title: "Análisis fallido",
          description: "Hubo un error al contactar al servicio de IA. Por favor, inténtelo de nuevo más tarde.",
        });
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Diagnóstico por Imagen IA</h1>
            <p className="text-muted-foreground">Suba una imagen microscópica para obtener un análisis asistido por IA.</p>
        </div>
        <form onSubmit={handleAnalyze}>
            <Card>
            <CardHeader>
                <CardTitle>Subir Imagen</CardTitle>
                <CardDescription>Seleccione una imagen y proporcione detalles opcionales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="image-upload">Archivo de Imagen</Label>
                    <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="pt-2 text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
                {imagePreview && (
                    <div className="flex justify-center">
                        <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-lg object-cover" />
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="sampleType" className="flex items-center gap-2"><FlaskConical className="h-4 w-4" />Tipo de muestra</Label>
                    <Input id="sampleType" name="sampleType" placeholder="Ej. Sangre, Orina" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="objective" className="flex items-center gap-2"><Microscope className="h-4 w-4" />Objetivo</Label>
                    <Input id="objective" name="objective" placeholder="Ej. 40x, 100x" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="staining" className="flex items-center gap-2"><Beaker className="h-4 w-4" />Tinción</Label>
                    <Input id="staining" name="staining" placeholder="Ej. Gram, Giemsa" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading || !imagePreview}>
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                    </>
                ) : (
                    <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Analizar con IA
                    </>
                )}
                </Button>
            </CardFooter>
            </Card>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-headline">Resultados del Análisis</h2>
        {isLoading && (
            <Card className="flex flex-col items-center justify-center p-8 space-y-4 h-full">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="text-muted-foreground">La IA está analizando su imagen. Esto puede tardar unos segundos...</p>
            </Card>
        )}
        {!isLoading && !result && (
            <Card className="flex flex-col items-center justify-center p-8 text-center space-y-2 h-full">
                <UploadCloud className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Esperando análisis</h3>
                <p className="text-muted-foreground">Los resultados de su análisis de imagen aparecerán aquí.</p>
            </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico Sugerido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-primary">{result.diagnosis}</p>
              </div>
              <div>
                <Label>Confianza del Modelo</Label>
                <div className="flex items-center gap-2">
                    <Progress value={result.confidence * 100} className="w-[90%]" />
                    <span className="font-bold text-sm">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
              {result.flaggedAreas && (
                <div>
                  <Label>Áreas de Interés Marcadas</Label>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{result.flaggedAreas}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

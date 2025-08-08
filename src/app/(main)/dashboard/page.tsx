import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Bot, MessageSquare, PlusCircle, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { communityFeedData } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Bienvenido, Lic NOMBRE</CardTitle>
            <CardDescription>
              Aquí tienes un resumen de tus últimas actividades en BiotIA!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             <Link href="/diagnostics">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sube un nuevo Campo</CardTitle>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">Inicia un nuevo Análisis.</div>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/atlas">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consulta el Atlas</CardTitle>
                        <ScanSearch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">Explora la base de datos de campos.</div>
                    </CardContent>
                </Card>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Último Diagnóstico</CardTitle>
            <CardDescription>Resultado de tu última imagen analizada.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2 text-center">
            <Image
                src="https://placehold.co/300x200.png"
                width={300}
                height={200}
                alt="Latest analysis"
                className="rounded-md"
                data-ai-hint="microscope bacteria"
            />
            <p className="font-semibold mt-2">Streptococcus pneumoniae CURSIVA</p>
            <p className="text-sm text-muted-foreground">Confianza: 92%</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
                <Link href="/diagnostics">Ver Detalles <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="font-headline">Chatbot BiotIA</CardTitle>
              <CardDescription>
                Tienes preguntas de tinciones o Identificación al microscopio? Obten respuestas al instante!
              </CardDescription>
            </div>
            <Bot className="h-8 w-8 ml-auto text-primary" />
          </CardHeader>
          <CardContent>
            <div className=" p-3 bg-muted rounded-md text-sm text-muted-foreground">
                "¿Cuáles son los criterios para diferenciar E. coli de Klebsiella en Agar MacConkey?"
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full" asChild>
              <Link href="/chatbot">Chatear con BiotIA</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-headline mb-4">Comunidad de Analistas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {communityFeedData.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.user.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src={post.imageUrl}
                  alt="Community post image"
                  width={600}
                  height={400}
                  className="rounded-lg mb-4 aspect-[3/2] object-cover"
                  data-ai-hint={post.aiHint}
                />
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MessageSquare className="mr-2 h-4 w-4" /> {post.comments} Comentarios
                </Button>
                 <Button asChild size="sm">
                    <Link href="/community">
                        Ver Caso
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

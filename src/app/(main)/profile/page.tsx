import Image from "next/image";
import { userProfileData } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function ProfilePage() {
  const { name, specialty, institution, avatarUrl, stats, uploads } = userProfileData;

  return (
    <div className="space-y-8">
       <Card>
           <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-32 w-32 border-4 border-primary">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{name}</h1>
                    <p className="text-primary font-medium">{specialty}</p>
                    <p className="text-muted-foreground">{institution}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">{stats.sharedCases}</p>
                        <p className="text-sm text-muted-foreground">Casos Compartidos</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">{stats.diagnosticsRequested}</p>
                        <p className="text-sm text-muted-foreground">Diagnósticos IA</p>
                    </div>
                </div>
                <Button variant="outline" className="ml-auto">
                    <Edit className="mr-2 h-4 w-4"/>
                    Editar Perfil
                </Button>
           </CardContent>
       </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Imágenes Subidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploads.map((upload) => (
            <Card key={upload.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <Image
                  src={upload.imageUrl}
                  alt={`Upload ${upload.id}`}
                  width={400}
                  height={400}
                  className="aspect-square object-cover w-full group-hover:scale-105 transition-transform"
                  data-ai-hint={upload.aiHint}
                />
              </CardContent>
              <div className="p-4 bg-card">
                  <p className="font-semibold text-sm truncate">{upload.diagnosis}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

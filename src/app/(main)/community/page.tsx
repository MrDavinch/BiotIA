import Image from "next/image";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { communityFeedData } from "@/lib/data";

export default function CommunityPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline">Casos Compartidos</h1>
            <p className="text-muted-foreground">
            Explore casos clínicos y hallazgos compartidos por la comunidad.
            </p>
        </div>
        <div className="space-y-6">
          {communityFeedData.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{post.user.name}</CardTitle>
                  <CardDescription>Hace 2 horas</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                 <p className="text-sm mb-4">{post.description}</p>
                 <Image
                  src={post.imageUrl}
                  alt="Community post image"
                  width={800}
                  height={500}
                  className="rounded-lg aspect-video object-cover border"
                  data-ai-hint={post.aiHint}
                />
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-around">
                <Button variant="ghost" className="text-muted-foreground">
                  <ThumbsUp className="mr-2 h-4 w-4" /> {post.likes} Me gusta
                </Button>
                <Button variant="ghost" className="text-muted-foreground">
                  <MessageSquare className="mr-2 h-4 w-4" /> {post.comments} Comentar
                </Button>
                <Button variant="ghost" className="text-muted-foreground">
                  <Share2 className="mr-2 h-4 w-4" /> Compartir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <aside className="md:col-span-1">
        <div className="sticky top-20">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Usuarios más Activos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: "Dr. Alex Rodriguez", specialty: "Microbiología" },
                        { name: "Maria Flores", specialty: "Hematología" },
                        { name: "Carlos Vega", specialty: "Parasitología" },
                    ].map(user => (
                        <div key={user.name} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/100x100.png?text=${user.name.charAt(0)}`} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.specialty}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </aside>
    </div>
  );
}

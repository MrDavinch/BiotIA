import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div>
        <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline">Configuración</h1>
            <p className="text-muted-foreground">Gestiona la información de tu cuenta y tus preferencias.</p>
        </div>
        <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
                <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tus datos personales. Estos serán visibles para otros en tu perfil.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" defaultValue="Dr. Evelyn Reed" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="specialty">Especialidad</Label>
                        <Input id="specialty" defaultValue="Clinical Microbiologist" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="institution">Institución</Label>
                        <Input id="institution" defaultValue="Metro Health Institute" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Guardar Cambios</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="notifications">
                <Card>
                <CardHeader>
                    <CardTitle>Notificaciones</CardTitle>
                    <CardDescription>Gestiona cómo recibes las notificaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Notificaciones por Email</p>
                            <p className="text-sm text-muted-foreground">Recibe resúmenes de actividad y noticias.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Comentarios y Me Gusta</p>
                            <p className="text-sm text-muted-foreground">Recibe notificaciones push cuando alguien interactúa con tus posts.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Nuevos Seguidores</p>
                            <p className="text-sm text-muted-foreground">Recibe notificaciones cuando alguien te sigue.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Guardar Preferencias</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="security">
                <Card>
                <CardHeader>
                    <CardTitle>Seguridad</CardTitle>
                    <CardDescription>Cambia tu contraseña y gestiona la seguridad de tu cuenta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña Actual</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Actualizar Contraseña</Button>
                    <Button variant="destructive">Eliminar Cuenta</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

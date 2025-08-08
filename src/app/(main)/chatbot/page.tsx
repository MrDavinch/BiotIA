'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  image?: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente de BiotIA. ¿Cómo puedo ayudarte hoy? Puedes hacerme una pregunta o adjuntar una imagen para analizar.",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now(), text: input, sender: 'user' },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          id: Date.now() + 1,
          text: 'Gracias por tu pregunta. Analizando la información... Basado en los protocolos estándar, para diferenciar E. coli de Klebsiella en agar MacConkey, debes observar la morfología de la colonia. E. coli típicamente produce colonias secas, de color rosa a rojo, debido a la fermentación de la lactosa, a menudo con un precipitado de bilis. Klebsiella produce colonias grandes, mucoides y de color rosa, indicando también fermentación de lactosa pero con una apariencia más viscosa.',
          sender: 'ai',
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline">Chatbot IA</h1>
            <p className="text-muted-foreground">Tu asistente de laboratorio personal. Pregunta lo que necesites.</p>
        </div>
        <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-4 ${
                        message.sender === 'user' ? 'justify-end' : ''
                        }`}
                    >
                        {message.sender === 'ai' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={`rounded-lg p-3 max-w-lg ${
                            message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                        >
                        <p className="text-sm">{message.text}</p>
                        </div>
                         {message.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg p-3 bg-muted flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        </div>
                    )}
                </div>
                </ScrollArea>
                <div className="border-t p-4 bg-card">
                <div className="relative">
                    <Textarea
                    placeholder="Escribe tu mensaje o adjunta una imagen..."
                    className="pr-24 min-h-[48px]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                        }
                    }}
                    />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

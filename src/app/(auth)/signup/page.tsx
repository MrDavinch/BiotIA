'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BiotiaLogo } from "@/components/biotia-logo"
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
       <CardHeader className="space-y-1 text-center flex flex-col items-center">
        <div className="flex justify-center mb-4">
            <BiotiaLogo className="w-20 h-20" />
        </div>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create your BiotIA Pro account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="Dr. Jane Doe" required />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                  Create an account
              </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

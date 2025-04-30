"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

// Placeholder SVG for LexFlow Logo
const LexFlowLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (enhance as needed)
    if (!email || !password) {
      alert("Lütfen e-posta ve şifrenizi girin.");
      return;
    }
    // Placeholder for actual login logic
    console.log("Login attempt with:", { email, password });

    // Simulate successful login and redirect to dashboard
    // In a real app, replace this with actual authentication check
    // For demo purposes, redirect immediately
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4 text-primary">
            <LexFlowLogo />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınıza erişmek için e-posta adresinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Şifre</Label>
                {/* Optional: Add Forgot Password Link */}
                {/* <Link href="#" className="text-sm text-accent hover:underline">
                  Şifremi Unuttum?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-accent"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200">
              Giriş Yap
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Hesabınız yok mu?{" "}
            <Link href="/auth/register" className="text-accent hover:underline">
              Kayıt Ol
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

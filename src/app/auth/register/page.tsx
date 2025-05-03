"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Briefcase } from "lucide-react"; // Import icons
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";

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

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | undefined>(undefined); // State for selected role

  // Client specific fields
  const [tcKimlik, setTcKimlik] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Lawyer specific fields
  const [barRegistrationNumber, setBarRegistrationNumber] = useState("");
  const [specialization, setSpecialization] = useState("");

  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for common fields
    if (!firstName || !lastName || !email || !password || !role) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // Role-specific validation
    if (role === "client") {
      if (!tcKimlik || !birthDate || !phone || !address) {
        alert("Lütfen tüm müvekkil bilgilerini doldurun.");
        return;
      }
    } else if (role === "lawyer") {
      if (!barRegistrationNumber || !specialization) {
        alert("Lütfen tüm avukat bilgilerini doldurun.");
        return;
      }
    }

    // Placeholder for actual registration logic
    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      role,
      ...(role === "client"
        ? { tcKimlik, birthDate, phone, address }
        : { barRegistrationNumber, specialization }),
    };
    console.log("Registration attempt with:", registrationData);

    // Simulate successful registration and redirect to login
    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-lg shadow-lg rounded-lg">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center mb-4 text-primary">
             <LexFlowLogo />
           </div>
          <CardTitle className="text-2xl font-bold text-primary">Kayıt Ol</CardTitle>
          <CardDescription>
            Başlamak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="role" className="focus:ring-accent">
                  <SelectValue placeholder="Rol Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Müvekkil</SelectItem>
                  <SelectItem value="lawyer">Avukat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Ad</Label>
                <Input
                  id="first-name"
                  placeholder="Ahmet"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Soyad</Label>
                <Input
                  id="last-name"
                  placeholder="Yılmaz"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="focus:ring-accent"
                />
              </div>
            </div>
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
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-accent"
              />
            </div>

            {/* Client Specific Fields */}
            {role === "client" && (
              <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                 <h4 className="flex items-center gap-2 text-sm font-semibold text-primary"><UserCircle className="h-4 w-4" /> Müvekkil Bilgileri</h4>
                <div className="space-y-2">
                  <Label htmlFor="tcKimlik">T.C. Kimlik No</Label>
                  <Input
                    id="tcKimlik"
                    placeholder="12345678901"
                    required
                    value={tcKimlik}
                    onChange={(e) => setTcKimlik(e.target.value)}
                    className="focus:ring-accent"
                    maxLength={11}
                  />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="birthDate">Doğum Tarihi</Label>
                    <DatePicker
                       date={birthDate}
                       setDate={setBirthDate}
                       placeholder="Doğum Tarihi Seçin"
                       className="focus:ring-accent"
                    />
                 </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon Numarası</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+90 555 123 4567"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Textarea
                    id="address"
                    placeholder="Adresinizi girin"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="focus:ring-accent"
                  />
                </div>
              </div>
            )}

            {/* Lawyer Specific Fields */}
            {role === "lawyer" && (
              <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-primary"><Briefcase className="h-4 w-4" /> Avukat Bilgileri</h4>
                <div className="space-y-2">
                  <Label htmlFor="barRegistrationNumber">
                    Baro Sicil Numarası
                  </Label>
                  <Input
                    id="barRegistrationNumber"
                    placeholder="Baro sicil numaranızı girin"
                    required
                    value={barRegistrationNumber}
                    onChange={(e) => setBarRegistrationNumber(e.target.value)}
                    className="focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Uzmanlık Alanı</Label>
                  <Input
                    id="specialization"
                    placeholder="Uzmanlık alanınızı girin"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="focus:ring-accent"
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200">
              Hesap Oluştur
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Zaten hesabınız var mı?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">
              Giriş Yap
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

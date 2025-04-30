import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings, User, LogOut, Scale, Users, Briefcase } from "lucide-react"; // Added relevant icons

// Placeholder SVG for LexFlow Logo (smaller version for header)
const LexFlowLogoSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, get user info from session/auth context
  const userName = "Kullanıcı Adı";
  const userInitials = userName.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-primary px-4 md:px-6 text-primary-foreground shadow-md z-50">
        {/* Left Side: Mobile Menu & Logo */}
        <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden border-primary-foreground text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü Aç/Kapat</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background text-foreground">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold text-primary mb-4"
                >
                  <LexFlowLogoSmall />
                  <span>LexFlow</span>
                </Link>
                <Link
                  href="/dashboard/hearings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                  prefetch={false}
                >
                  <Scale className="h-4 w-4" />
                  Duruşmalarım
                </Link>
                <Link
                  href="/dashboard/connections" // Consolidated page for lawyers/clients
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                  prefetch={false}
                >
                  <Users className="h-4 w-4" />
                  Avukatlarım/Müvekkillerim
                </Link>
                <Link
                  href="/dashboard/cases"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                  prefetch={false}
                >
                  <Briefcase className="h-4 w-4" />
                  Davalarım
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted mt-auto"
                  prefetch={false}
                >
                  <Settings className="h-4 w-4" />
                  Ayarlar
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo for Desktop */}
           <Link
            href="/dashboard"
            className="hidden items-center gap-2 text-lg font-semibold md:flex text-primary-foreground"
            prefetch={false}
          >
            <LexFlowLogoSmall />
            <span className="sr-only">LexFlow</span>
          </Link>
        </nav>

        {/* Right Side: Profile Dropdown */}
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full border border-primary-foreground/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback className="bg-primary-foreground text-primary">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Kullanıcı menüsünü aç/kapat</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" /> Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Ayarlar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 {/* Add Logout functionality here */}
                <Link href="/auth/login" className="cursor-pointer flex items-center gap-2 text-destructive">
                   <LogOut className="h-4 w-4" /> Çıkış Yap
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}

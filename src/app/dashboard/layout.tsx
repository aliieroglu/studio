
'use client'; // Required because we use hooks (useAuth)

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'; // Import usePathname
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings, User, LogOut, Scale, Users, Briefcase, LayoutDashboard } from "lucide-react"; // Added LayoutDashboard
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { cn } from "@/lib/utils"; // Import cn

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


// Navigation Items Definition
const navItems = {
  client: [
    { href: "/dashboard", label: "Gösterge Paneli", icon: LayoutDashboard },
    { href: "/dashboard/hearings", label: "Duruşmalarım", icon: Scale },
    { href: "/dashboard/connections", label: "Avukatlarım", icon: Users },
    { href: "/dashboard/cases", label: "Davalarım", icon: Briefcase },
  ],
  lawyer: [
    { href: "/dashboard", label: "Gösterge Paneli", icon: LayoutDashboard },
    { href: "/dashboard/hearings", label: "Duruşmalar", icon: Scale }, // Maybe just "Duruşmalar" for lawyers
    { href: "/dashboard/connections", label: "Müvekkillerim", icon: Users },
    { href: "/dashboard/cases", label: "Müvekkil Davaları", icon: Briefcase },
    // Add lawyer-specific items here, e.g., "/dashboard/billing"
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole } = useAuth();
  const pathname = usePathname(); // Get current path

  // In a real app, get user info from session/auth context
  const userName = "Kullanıcı Adı";
  const userInitials = userName.split(' ').map(n => n[0]).join('');

  const currentNavItems = userRole ? navItems[userRole] : []; // Get nav items based on role

  const renderNavLinks = (isMobile = false) => (
    currentNavItems.map((item) => {
       const isActive = pathname === item.href;
       return (
         <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
             isActive
              ? "bg-muted text-primary" // Active link style
              : "text-muted-foreground hover:text-primary hover:bg-muted", // Inactive link style
             isMobile ? "text-lg" : "text-sm" // Adjust text size for mobile/desktop
          )}
          prefetch={false}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      );
    })
   );

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
                {renderNavLinks(true)} {/* Render mobile nav links */}
                <Link
                  href="/dashboard/settings"
                  className={cn(
                     "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted mt-auto",
                     pathname === "/dashboard/settings" ? "bg-muted text-primary" : ""
                   )}
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
           {/* Desktop Navigation Links */}
           <div className="hidden md:flex md:gap-4">
              {renderNavLinks()} {/* Render desktop nav links */}
            </div>
        </nav>

        {/* Right Side: Profile Dropdown */}
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full border border-primary-foreground/50">
                <Avatar className="h-8 w-8">
                  {/* Use a placeholder or actual user image */}
                  <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User Avatar" />
                  <AvatarFallback className="bg-primary-foreground text-primary">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Kullanıcı menüsünü aç/kapat</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground">
              <DropdownMenuLabel>Hesabım ({userRole === 'client' ? 'Müvekkil' : 'Avukat'})</DropdownMenuLabel>
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
                 {/* Add Logout functionality here - clears AuthContext and redirects */}
                <Link href="/auth/login" onClick={() => { /* Add actual logout logic */ }} className="cursor-pointer flex items-center gap-2 text-destructive">
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

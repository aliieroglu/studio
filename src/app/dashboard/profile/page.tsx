
'use client'; // Required because we use hooks (useAuth)

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton


export default function ProfilePage() {
    const { userRole } = useAuth();

    // Fetch user data here in a real app - this is still placeholder
    const userData = {
        firstName: "Kullanıcı",
        lastName: "Adı",
        email: userRole === 'lawyer' ? "lawyer@mail.com" : "kullanici@mail.com", // Simulate email based on role
        // role: userRole === 'client' ? "Müvekkil" : "Avukat", // Get role from context
        avatarUrl: "https://picsum.photos/seed/user/100/100", // Placeholder user image
    };
    const userInitials = `${userData.firstName[0]}${userData.lastName[0]}`;

    // Optional: Loading state
    if (!userRole) {
       return (
         <div className="container mx-auto py-8 space-y-6">
           <div className="flex items-center gap-4 mb-8">
             <Skeleton className="h-8 w-8 rounded-full" />
             <Skeleton className="h-8 w-1/4" />
           </div>
           <Card className="max-w-2xl mx-auto">
             <CardHeader>
               <Skeleton className="h-6 w-1/2 mb-2" />
               <Skeleton className="h-4 w-3/4" />
             </CardHeader>
             <CardContent className="space-y-6 pt-6">
                <div className="flex items-center gap-4">
                   <Skeleton className="h-16 w-16 rounded-full" />
                   <div className="space-y-2">
                     <Skeleton className="h-5 w-32" />
                     <Skeleton className="h-4 w-20" />
                   </div>
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
             </CardContent>
           </Card>
         </div>
       );
    }


  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Profilim</h1>
       </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profil Bilgileri</CardTitle>
          <CardDescription>Profil bilgilerinizi görüntüleyin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex items-center gap-4">
             <Avatar className="h-16 w-16">
               <AvatarImage src={userData.avatarUrl} alt="User Avatar" />
               <AvatarFallback className="bg-primary text-primary-foreground text-xl">{userInitials}</AvatarFallback>
             </Avatar>
            <div>
                <h2 className="text-lg font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
                 {/* Display role from context */}
                <p className="text-sm font-semibold text-accent">
                   {userRole === 'client' ? 'Müvekkil' : 'Avukat'}
                 </p>
            </div>
           </div>
           <div className="space-y-2">
             <Label htmlFor="firstName">Ad</Label>
             <Input id="firstName" defaultValue={userData.firstName} disabled />
           </div>
           <div className="space-y-2">
             <Label htmlFor="lastName">Soyad</Label>
             <Input id="lastName" defaultValue={userData.lastName} disabled />
           </div>
           <div className="space-y-2">
             <Label htmlFor="email">E-posta</Label>
             <Input id="email" type="email" defaultValue={userData.email} disabled />
           </div>
           {/* Add form for updating profile if needed */}
           {/* <Button className="mt-4 bg-accent hover:bg-accent/90">Bilgileri Güncelle</Button> */}
        </CardContent>
      </Card>
    </div>
  );
}

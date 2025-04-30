import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ProfilePage() {
    // Fetch user data here in a real app
    const userData = {
        firstName: "Kullanıcı",
        lastName: "Adı",
        email: "kullanici@mail.com",
        role: "Müvekkil", // Example role
        avatarUrl: "/placeholder-user.jpg",
    };
    const userInitials = `${userData.firstName[0]}${userData.lastName[0]}`;


  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Profilim</h1>
       </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profil Bilgileri</CardTitle>
          <CardDescription>Profil bilgilerinizi görüntüleyin ve güncelleyin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex items-center gap-4">
             <Avatar className="h-16 w-16">
               <AvatarImage src={userData.avatarUrl} alt="User Avatar" />
               <AvatarFallback className="bg-primary text-primary-foreground text-xl">{userInitials}</AvatarFallback>
             </Avatar>
            <div>
                <h2 className="text-lg font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
                <p className="text-sm text-muted-foreground">{userData.role}</p>
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


'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Search, ChevronRight, PlusCircle } from "lucide-react"; // Added PlusCircle
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Import Button

// Sample data (replace with actual data fetching)
const currentClients = [
  {
    id: "c1",
    name: "Ali Veli",
    imageUrl: "https://picsum.photos/seed/client1/100/100",
    initials: "AV",
    caseType: "Ticari Dava", // Example detail
  },
  {
    id: "c2",
    name: "Zeynep Kara",
    imageUrl: "https://picsum.photos/seed/client2/100/100",
    initials: "ZK",
    caseType: "Boşanma Davası", // Example detail
  },
];

const pastClients = [
   {
     id: "c3",
     name: "Mustafa Demir",
     imageUrl: "https://picsum.photos/seed/client3/100/100", // Placeholder
     initials: "MD",
     caseType: "Ceza Davası", // Example detail
   },
];

export default function LawyerConnectionsView() {
  return (
    <div className="container mx-auto py-8 space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Müvekkillerim</h1>
          </div>
           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Müvekkil Ara..."
                  className="pl-10 focus:ring-accent"
                />
              </div>
               {/* Add New Client Button */}
              <Button variant="outline" size="icon" className="shrink-0">
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Yeni Müvekkil Ekle</span>
              </Button>
          </div>
      </div>


      {/* Current Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Güncel Müvekkillerim</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentClients.map((client) => (
             <Link href={`/dashboard/client/${client.id}`} key={client.id} className="block group"> {/* Adjust link as needed */}
               <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={client.imageUrl} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium text-foreground">{client.name}</span>
                     <p className="text-sm text-muted-foreground">{client.caseType}</p> {/* Example detail */}
                  </div>
                </div>
                 <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
          {currentClients.length === 0 && (
            <p className="text-muted-foreground">Henüz aktif bir müvekkiliniz bulunmamaktadır.</p>
          )}
        </CardContent>
      </Card>

      {/* Past Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Geçmiş Müvekkillerim</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pastClients.map((client) => (
            <Link href={`/dashboard/client/${client.id}`} key={client.id} className="block group"> {/* Adjust link */}
               <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={client.imageUrl} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                   <div>
                      <span className="font-medium text-foreground">{client.name}</span>
                      <p className="text-sm text-muted-foreground">{client.caseType}</p> {/* Example detail */}
                   </div>
                </div>
                 <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
          {pastClients.length === 0 && (
            <p className="text-muted-foreground">Geçmişte çalıştığınız bir müvekkil bulunmamaktadır.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

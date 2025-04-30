
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Search, ChevronRight } from "lucide-react";
import Link from 'next/link';

// Sample data (replace with actual data fetching)
const currentLawyers = [
  {
    id: "l1",
    name: "Av. Ayşe Yılmaz",
    imageUrl: "https://picsum.photos/seed/lawyer1/100/100",
    initials: "AY",
  },
  {
    id: "l2",
    name: "Av. Mehmet Öztürk",
    imageUrl: "https://picsum.photos/seed/lawyer2/100/100",
    initials: "MÖ",
  },
];

const pastLawyers = [
   {
     id: "l3",
     name: "Av. Sahika Bilmemne", // Example Name from image
     imageUrl: "https://picsum.photos/seed/lawyer3/100/100", // Placeholder
     initials: "SB",
   },
];


export default function ClientConnectionsView() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Avukatlarım</h1>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Avukat Ara..."
              className="pl-10 focus:ring-accent"
            />
          </div>
      </div>

      {/* Current Lawyers */}
      <Card>
        <CardHeader>
          <CardTitle>Güncel Avukatlarım</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentLawyers.map((lawyer) => (
            <Link href={`/dashboard/lawyers/${lawyer.id}`} key={lawyer.id} className="block group"> {/* Updated Link */}
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} data-ai-hint="lawyer person" />
                    <AvatarFallback>{lawyer.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{lawyer.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
          {currentLawyers.length === 0 && (
            <p className="text-muted-foreground">Henüz aktif bir avukatınız bulunmamaktadır.</p>
          )}
        </CardContent>
      </Card>

      {/* Past Lawyers */}
      <Card>
        <CardHeader>
          <CardTitle>Geçmiş Avukatlarım</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pastLawyers.map((lawyer) => (
             <Link href={`/dashboard/lawyers/${lawyer.id}`} key={lawyer.id} className="block group"> {/* Updated Link */}
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} data-ai-hint="lawyer person" />
                      <AvatarFallback>{lawyer.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{lawyer.name}</span>
                  </div>
                   <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </Link>
          ))}
          {pastLawyers.length === 0 && (
            <p className="text-muted-foreground">Geçmişte çalıştığınız bir avukat bulunmamaktadır.</p>
          )}
        </CardContent>
      </Card>
       {/* Optionally add a button to connect with a new lawyer */}
       {/* <Button className="mt-6 bg-accent hover:bg-accent/90">Yeni Avukat Ekle</Button> */}
    </div>
  );
}

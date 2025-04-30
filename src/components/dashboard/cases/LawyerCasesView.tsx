
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { Briefcase, Clock, MapPin, Eye, PlusCircle } from "lucide-react"; // Added icons
import Image from 'next/image'; // Import next/image
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

// Sample data for Lawyer's view (replace with actual data fetching)
const ongoingCases = [
  {
    id: "1", // Case ID
    clientId: "c1", // Client ID associated with the case
    clientName: "Ali Veli",
    name: "Kamu Davası",
    nextHearingDate: "25/09/2024 14:00",
    timeRemaining: "1 ay 10 gün 5 saat", // Calculate dynamically
    courtName: "İstanbul 1. Asliye Ceza Mahkemesi",
    courtAddress: "Çağlayan Adliyesi, İstanbul",
    client: { // Information about the client for this case
      name: "Ali Veli",
      imageUrl: "https://picsum.photos/seed/client1/100/100", // Placeholder client image
      initials: "AV",
    },
  },
  {
    id: "2",
    clientId: "c2",
    clientName: "Zeynep Kara",
    name: "Boşanma Davası",
    nextHearingDate: "10/10/2024 09:30",
    timeRemaining: "1 ay 25 gün 2 saat",
    courtName: "Ankara 3. Aile Mahkemesi",
    courtAddress: "Sıhhiye Adliyesi, Ankara",
    client: {
      name: "Zeynep Kara",
      imageUrl: "https://picsum.photos/seed/client2/100/100",
      initials: "ZK",
    },
  },
];

const completedCases = [
  { id: "c1", clientId: "c3", clientName: "Mustafa Demir", name: "Miras Davası" },
  // Add more completed cases relevant to the lawyer
];

export default function LawyerCasesView() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <div className="flex items-center gap-4">
           <Briefcase className="h-8 w-8 text-primary" />
           <h1 className="text-3xl font-bold text-primary">Müvekkil Davaları</h1>
         </div>
         {/* Add New Case Button */}
         <Button className="bg-accent hover:bg-accent/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Yeni Dava Oluştur
         </Button>
      </div>


      {/* Devam Eden Davalar */}
      <h2 className="text-2xl font-semibold text-primary mb-4">Devam Eden Davalar</h2>
      <Card className="mb-8 border-2 border-primary/50 shadow-lg">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {ongoingCases.map((caseItem) => (
              <AccordionItem value={`ongoing-${caseItem.id}`} key={caseItem.id} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-muted/50">
                  {caseItem.clientName} - {caseItem.name} {/* Show Client Name and Case Name */}
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2 pb-4 bg-muted/20">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Case Details */}
                    <div className="flex-1 space-y-3 text-foreground">
                      <h3 className="text-md font-semibold mb-2 text-primary">Son Duruşmaya Ait Bilgiler</h3>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span><span className="font-medium">Duruşma Tarihi ve Saati:</span> {caseItem.nextHearingDate}</span>
                      </div>
                      <div className="text-sm text-muted-foreground italic">
                        (Önümüzdeki duruşmaya kalan süre: {caseItem.timeRemaining})
                      </div>
                       <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span><span className="font-medium">Mahkeme İsmi ve Adresi:</span> {caseItem.courtName}, {caseItem.courtAddress}</span>
                      </div>
                      {/* View Details Button - Links to the specific case detail page */}
                      <div className="pt-4">
                        <Link href={`/dashboard/cases/${caseItem.id}`} passHref>
                           <Button variant="outline" size="sm">
                             <Eye className="mr-2 h-4 w-4" />
                             Dava Detayını Görüntüle
                           </Button>
                        </Link>
                      </div>
                    </div>
                     {/* Client Info */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-sm font-medium text-primary mb-1">Müvekkil</p>
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden border-2 border-accent shadow-md">
                         <Image
                           src={caseItem.client.imageUrl}
                           alt={`Müvekkil ${caseItem.client.name}`}
                           layout="fill"
                           objectFit="cover"
                           className="rounded-md"
                           data-ai-hint="person client"
                         />
                       </div>
                       <span className="text-sm text-muted-foreground mt-1">{caseItem.client.name}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
             {ongoingCases.length === 0 && (
               <div className="p-6 text-muted-foreground">Henüz devam eden davanız bulunmamaktadır.</div>
             )}
          </Accordion>
        </CardContent>
      </Card>

      {/* Tamamlanmış Davalar */}
      <h2 className="text-2xl font-semibold text-accent mb-4">Tamamlanmış Davalar</h2>
       <Card className="border-2 border-accent/50 shadow-lg">
         <CardContent className="p-0">
           <Accordion type="single" collapsible className="w-full">
             {completedCases.map((caseItem) => (
              <AccordionItem value={`completed-${caseItem.id}`} key={caseItem.id} className="border-b last:border-b-0 border-accent/30">
                <AccordionTrigger className="px-6 py-3 text-md font-medium text-accent/90 hover:bg-muted/30">
                   {caseItem.clientName} - {caseItem.name} {/* Show Client Name and Case Name */}
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2 pb-4 bg-muted/10">
                  <p className="text-muted-foreground">Bu dava tamamlanmıştır.</p>
                   {/* Optionally add a details button for completed cases */}
                   <div className="pt-4">
                     <Link href={`/dashboard/cases/${caseItem.id}`} passHref>
                        <Button variant="outline" size="sm" className="border-accent/50 text-accent/90 hover:bg-accent/10">
                          <Eye className="mr-2 h-4 w-4" />
                          Detay Görüntüle
                        </Button>
                     </Link>
                   </div>
                </AccordionContent>
              </AccordionItem>
            ))}
             {completedCases.length === 0 && (
               <div className="p-6 text-muted-foreground">Henüz tamamlanmış davanız bulunmamaktadır.</div>
             )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}


'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, CircleDot, ArrowLeft, Clock, DollarSign, Gavel, CalendarCheck } from "lucide-react"; // Icons for stages and new sections
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"; // Import Badge

// Sample Data (Replace with actual data fetching based on params.caseId)
const caseDataMap: { [key: string]: any } = {
  "1": {
    id: "1",
    name: "Kamu Davası",
    description: "Mala zarar verme ve tehdit suçlamaları ile ilgili kamu davası.",
    detailedDescription: "Bu dava, müvekkilin komşusu tarafından mülküne verilen zarar ve ardından aldığı tehditler üzerine açılmıştır. İlk duruşmada tanıklar dinlenmiş, ikinci duruşmada ise bilirkişi raporu beklenmektedir.", // Added detailed description
    status: "Devam Ediyor",
    startDate: "15/04/2024",
    nextHearingDate: "25/09/2024 14:00",
    courtName: "İstanbul 1. Asliye Ceza Mahkemesi",
    courtAddress: "Çağlayan Adliyesi, İstanbul",
    assignedJudge: "Hakim Ahmet Çelik", // Added judge info
    lawyer: {
      name: "Av. Ayşe Yılmaz",
      imageUrl: "https://picsum.photos/seed/lawyer1/100/100",
      initials: "AY",
    },
    stages: [
      { name: "Dava Açıldı", date: "15/04/2024", completed: true },
      { name: "İlk Duruşma", date: "30/05/2024", completed: true },
      { name: "Tanık Dinlendi", date: "15/07/2024", completed: true },
      { name: "Savunma Hazırlanıyor", date: "Devam Ediyor", completed: false, current: true },
      { name: "Karar Duruşması", date: "Bekleniyor", completed: false },
    ],
    documents: [
        { name: "Dava Dilekçesi.pdf", url: "#" },
        { name: "Kanıtlar_Listesi.docx", url: "#" },
    ],
    requiredDocuments: [ // Added required documents
        { name: "Ek Savunma Dilekçesi", dueDate: "10/09/2024" },
        { name: "Bilirkişi Raporuna İtiraz", dueDate: "01/10/2024" },
    ],
    paymentInfo: { // Added payment info
        totalAmount: "15,000 TL",
        status: "Kısmen Ödendi", // e.g., "Ödendi", "Ödenmedi", "Kısmen Ödendi"
        statusVariant: "secondary" // "default", "destructive", "secondary" for badge color
    }
  },
  "2": {
    id: "2",
    name: "Boşanma Davası",
    description: "Anlaşmalı boşanma davası süreci.",
    detailedDescription: "Taraflar arasında anlaşma sağlanmış olup, protokol mahkemeye sunulmuştur. Duruşma günü beklenmektedir.",
    status: "Devam Ediyor",
    startDate: "01/06/2024",
    nextHearingDate: "10/10/2024 09:30",
    courtName: "Ankara 3. Aile Mahkemesi",
    courtAddress: "Sıhhiye Adliyesi, Ankara",
    assignedJudge: "Hakim Fatma Güneş",
    lawyer: {
      name: "Av. Mehmet Öztürk",
      imageUrl: "https://picsum.photos/seed/lawyer2/100/100",
      initials: "MÖ",
    },
    stages: [
      { name: "Dava Açıldı", date: "01/06/2024", completed: true },
      { name: "Ön İnceleme Duruşması", date: "15/07/2024", completed: true },
      { name: "Anlaşma Protokolü Hazırlandı", date: "01/08/2024", completed: true },
      { name: "Duruşma Günü Bekleniyor", date: "10/10/2024", completed: false, current: true },
      { name: "Karar", date: "Bekleniyor", completed: false },
    ],
    documents: [
        { name: "Boşanma_Protokolü.pdf", url: "#" },
    ],
     requiredDocuments: [
        { name: "Nüfus Kayıt Örneği Güncellemesi", dueDate: "01/10/2024" },
    ],
    paymentInfo: {
        totalAmount: "10,000 TL",
        status: "Ödendi",
        statusVariant: "default"
    }
  },
   "c1": { // Example for completed case
     id: "c1",
     name: "Miras Davası",
     description: "Miras paylaşımı anlaşmazlığı davası.",
     detailedDescription: "Uzun süren müzakereler ve mahkeme süreci sonunda miras paylaşımı konusunda karar verilmiştir.",
     status: "Tamamlandı",
     startDate: "10/01/2023",
     endDate: "15/12/2023",
     courtName: "İzmir 2. Sulh Hukuk Mahkemesi",
     assignedJudge: "Hakim Ali Vural",
     lawyer: {
       name: "Av. Zeynep Kaya",
       imageUrl: "https://picsum.photos/seed/lawyer3/100/100",
       initials: "ZK",
     },
     stages: [
       { name: "Dava Açıldı", date: "10/01/2023", completed: true },
       { name: "Keşif Yapıldı", date: "20/03/2023", completed: true },
       { name: "Karar Verildi", date: "15/12/2023", completed: true },
     ],
     documents: [
       { name: "Karar_Metni.pdf", url: "#" },
     ],
     requiredDocuments: [], // No required documents for completed case
     paymentInfo: {
        totalAmount: "25,000 TL",
        status: "Ödendi",
        statusVariant: "default"
     }
   },
   // Add more cases as needed
};


interface CaseDetailPageProps {
  params: {
    caseId: string;
  };
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const caseDetails = caseDataMap[params.caseId];

  if (!caseDetails) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl text-destructive">Dava Bulunamadı</h1>
        <Link href="/dashboard/cases">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Davalarıma Geri Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
       {/* Back Button */}
       <Link href="/dashboard/cases">
         <Button variant="outline" size="sm">
           <ArrowLeft className="mr-2 h-4 w-4" /> Davalarıma Geri Dön
         </Button>
       </Link>

      {/* Case Header */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl flex items-center gap-3">
             <FileText className="h-8 w-8" />
            {caseDetails.name}
            <span className={`ml-auto text-sm px-3 py-1 rounded-full ${caseDetails.status === 'Tamamlandı' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                {caseDetails.status}
            </span>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 pt-1">
            {caseDetails.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b">
           <div>
             <h3 className="font-semibold text-muted-foreground mb-1">Başlangıç Tarihi</h3>
             <p>{caseDetails.startDate}</p>
           </div>
           {caseDetails.nextHearingDate && (
             <div>
               <h3 className="font-semibold text-muted-foreground mb-1">Sonraki Duruşma</h3>
               <p>{caseDetails.nextHearingDate}</p>
             </div>
           )}
           {caseDetails.endDate && (
              <div>
                <h3 className="font-semibold text-muted-foreground mb-1">Bitiş Tarihi</h3>
                <p>{caseDetails.endDate}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-muted-foreground mb-1">Mahkeme</h3>
              <p>{caseDetails.courtName}</p>
              <p className="text-sm text-muted-foreground">{caseDetails.courtAddress}</p> {/* Add Address */}
            </div>
             {/* Judge Info */}
             <div>
               <h3 className="font-semibold text-muted-foreground mb-1 flex items-center gap-2"><Gavel className="h-4 w-4" /> Mahkeme Heyeti / Hakim</h3>
               <p>{caseDetails.assignedJudge}</p>
             </div>
            {/* Lawyer Info */}
            <div className="md:col-span-1"> {/* Adjusted grid span */}
              <h3 className="font-semibold text-muted-foreground mb-1">Avukat</h3>
               <div className="flex items-center gap-3 mt-1">
                 <Avatar className="h-10 w-10 border">
                   <AvatarImage src={caseDetails.lawyer.imageUrl} alt={caseDetails.lawyer.name} />
                   <AvatarFallback>{caseDetails.lawyer.initials}</AvatarFallback>
                 </Avatar>
                 <span>{caseDetails.lawyer.name}</span>
               </div>
            </div>
        </CardContent>
         {/* Detailed Description Section */}
        <CardContent className="p-6">
           <h3 className="text-lg font-semibold mb-2 text-primary">Dava Hakkında Açıklama</h3>
           <p className="text-muted-foreground">{caseDetails.detailedDescription || "Bu dava hakkında henüz detaylı bir açıklama girilmemiştir."}</p>
         </CardContent>
      </Card>

      {/* Payment Information */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Ödeme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Toplam Tutar</h4>
                    <p>{caseDetails.paymentInfo.totalAmount}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Ödeme Durumu</h4>
                     <Badge variant={caseDetails.paymentInfo.statusVariant || 'secondary'}>
                        {caseDetails.paymentInfo.status}
                    </Badge>
                 </div>
            </CardContent>
        </Card>


       {/* Required Documents Section */}
       {caseDetails.requiredDocuments && caseDetails.requiredDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5" /> Gereken Belgeler ve Son Teslim Tarihleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {caseDetails.requiredDocuments.map((doc: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                 <span className="font-medium">{doc.name}</span>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Son Teslim: {doc.dueDate}</span>
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}


      {/* Case Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Dava Aşamaları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[calc(0.75rem_+_2px)] top-0 bottom-0 w-0.5 bg-border" aria-hidden="true"></div>

            {caseDetails.stages.map((stage: any, index: number) => (
              <div key={index} className="relative pb-8 last:pb-0">
                {/* Icon */}
                <div className={`absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full border-2 ${stage.completed ? 'bg-accent border-accent' : stage.current ? 'bg-primary border-primary animate-pulse' : 'bg-muted border-border'}`}>
                  {stage.completed ? (
                    <CheckCircle className="h-4 w-4 text-accent-foreground" />
                  ) : (
                     <CircleDot className={`h-3 w-3 ${stage.current ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  )}
                </div>
                {/* Content */}
                <div className="ml-10">
                  <h4 className={`font-semibold ${stage.current ? 'text-primary' : stage.completed ? 'text-accent' : 'text-foreground'}`}>
                    {stage.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{stage.date}</p>
                </div>
              </div>
            ))}
             {caseDetails.stages.length === 0 && (
                 <p className="text-muted-foreground ml-10">Henüz bir dava aşaması kaydedilmemiş.</p>
             )}
          </div>
        </CardContent>
      </Card>

       {/* Existing Documents Section */}
      {caseDetails.documents && caseDetails.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Dava Dosyaları</CardTitle>
             <CardDescription>Avukatınız tarafından yüklenen belgeler.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {caseDetails.documents.map((doc: any, index: number) => (
              <Link href={doc.url} key={index} target="_blank" rel="noopener noreferrer">
                 <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    {doc.name}
                 </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

    </div>
  );
}


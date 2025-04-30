
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Briefcase, GraduationCap, Phone, Mail, MapPin, Award, Percent } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Import Progress

// Sample Data Map (Replace with actual data fetching based on params.lawyerId)
const lawyerDataMap: { [key: string]: any } = {
  "l1": {
    id: "l1",
    name: "Av. Ayşe Yılmaz",
    title: "Avukat",
    barId: "231307114",
    rating: 4.5,
    imageUrl: "https://picsum.photos/seed/lawyer1/100/100",
    initials: "AY",
    description: "Ceza hukuku ve aile hukuku alanlarında 10 yılı aşkın deneyime sahip uzman avukat. Müvekkillerine adil ve etkili hukuki çözümler sunmayı hedefler.",
    completedCases: 150,
    successRate: 85, // Percentage
    expertise: [ "Ceza Hukuku", "Aile Hukuku", "İcra ve İflas Hukuku" ],
    experienceYears: 10,
    university: "İstanbul Üniversitesi Hukuk Fakültesi",
    masterDegree: "Marmara Üniversitesi - Özel Hukuk Yüksek Lisansı",
    phone: "+90 555 123 45 67",
    email: "ayse.yilmaz@lexflow.com",
    officeAddress: "Adalet Plaza, Kat 5, No:12, Beşiktaş, İstanbul",
  },
  "l2": {
    id: "l2",
    name: "Av. Mehmet Öztürk",
    title: "Avukat",
    barId: "123456789",
    rating: 4.2,
    imageUrl: "https://picsum.photos/seed/lawyer2/100/100",
    initials: "MÖ",
    description: "Ticaret hukuku ve gayrimenkul hukuku konularında uzmanlaşmış deneyimli avukat.",
    completedCases: 120,
    successRate: 80,
    expertise: [ "Ticaret Hukuku", "Gayrimenkul Hukuku", "Şirketler Hukuku" ],
    experienceYears: 8,
    university: "Ankara Üniversitesi Hukuk Fakültesi",
    masterDegree: null, // Example with no master's
    phone: "+90 555 987 65 43",
    email: "mehmet.ozturk@lexflow.com",
    officeAddress: "Hukukçular Sitesi, Blok A, No:5, Çankaya, Ankara",
  },
    "l3": {
     id: "l3",
     name: "Av. Sahika Bilmemne",
     title: "Avukat",
     barId: "987654321",
     rating: 4.8,
     imageUrl: "https://picsum.photos/seed/lawyer3/100/100",
     initials: "SB",
     description: "İş hukuku ve sosyal güvenlik hukuku alanlarında derinlemesine bilgi sahibi.",
     completedCases: 200,
     successRate: 92,
     expertise: [ "İş Hukuku", "Sosyal Güvenlik Hukuku", "Kira Hukuku" ],
     experienceYears: 15,
     university: "Dokuz Eylül Üniversitesi Hukuk Fakültesi",
     masterDegree: "Stanford University - LL.M.",
     phone: "+90 555 111 22 33",
     email: "sahika.b@lexflow.com",
     officeAddress: "İzmir Adliye Sarayı Karşısı, No: 1, Bayraklı, İzmir",
   },
  // Add more lawyers as needed
};

interface LawyerProfilePageProps {
  params: {
    lawyerId: string;
  };
}

export default function LawyerProfilePage({ params }: LawyerProfilePageProps) {
  const lawyerDetails = lawyerDataMap[params.lawyerId];

  if (!lawyerDetails) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl text-destructive">Avukat Bulunamadı</h1>
        <Link href="/dashboard/connections">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Avukatlarıma Geri Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
       {/* Back Button */}
       <Link href="/dashboard/connections">
         <Button variant="outline" size="sm">
           <ArrowLeft className="mr-2 h-4 w-4" /> Avukatlarıma Geri Dön
         </Button>
       </Link>

       {/* Profile Header */}
       <Card className="border-2 border-accent shadow-lg overflow-hidden">
           <CardHeader className="p-6 bg-card">
               <div className="flex flex-col sm:flex-row items-center gap-6">
                   <Avatar className="h-24 w-24 border-2 border-accent">
                       <AvatarImage src={lawyerDetails.imageUrl} alt={lawyerDetails.name} data-ai-hint="lawyer person" />
                       <AvatarFallback className="text-3xl">{lawyerDetails.initials}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1 text-center sm:text-left">
                       <CardTitle className="text-3xl text-primary">{lawyerDetails.name}</CardTitle>
                       <CardDescription className="text-muted-foreground">{lawyerDetails.title}</CardDescription>
                       <p className="text-sm text-muted-foreground mt-1">Baro Sicil No: {lawyerDetails.barId}</p>
                   </div>
                   <div className="flex items-center gap-1 text-accent">
                       <Star className="h-5 w-5 fill-current" />
                       <span className="font-semibold text-lg">{lawyerDetails.rating.toFixed(1)}</span>
                       <span className="text-sm text-muted-foreground ml-1">(Genel Puanlama)</span>
                   </div>
               </div>
           </CardHeader>
       </Card>

       {/* Description and Statistics */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description & Experience */}
           <Card className="lg:col-span-2">
               <CardHeader>
                   <CardTitle>Açıklama & Deneyim</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                   <p className="text-muted-foreground">{lawyerDetails.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="font-medium">Tamamlanmış Dava Sayısı:</span>
                        <span className="text-primary font-bold">{lawyerDetails.completedCases}+</span>
                    </div>
               </CardContent>
           </Card>

            {/* Success Rate */}
            <Card className="flex flex-col items-center justify-center p-6 bg-secondary">
                 <CardTitle className="text-center mb-4 text-primary">Ortalama Dava Başarı Oranı</CardTitle>
                 <div className="relative h-24 w-24"> {/* Container for circle progress */}
                    <svg className="absolute inset-0" viewBox="0 0 36 36">
                        <path
                         className="text-muted"
                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                         fill="none"
                         strokeWidth="3"
                        />
                        <path
                         className="text-accent"
                         strokeDasharray={`${lawyerDetails.successRate}, 100`}
                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                         fill="none"
                         strokeWidth="3"
                         strokeLinecap="round"
                         transform="rotate(-90 18 18)" // Start from top
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-3xl font-bold text-accent">{lawyerDetails.successRate}%</span>
                    </div>
                 </div>
           </Card>
       </div>


       {/* Expertise and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Expertise & Education */}
            <Card>
                <CardHeader>
                    <CardTitle>Uzmanlık Alanları ve Eğitim</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2"><Award className="h-5 w-5" /> Hukuk Dalı Uzmanlıkları</h4>
                        <div className="flex flex-wrap gap-2">
                            {lawyerDetails.expertise.map((area: string) => (
                                <Badge key={area} variant="secondary">{area}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2"><Briefcase className="h-5 w-5" /> Toplam Mesleki Tecrübe</h4>
                        <p>{lawyerDetails.experienceYears} Yıl</p>
                    </div>
                     <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Eğitim Bilgileri</h4>
                        <p><strong>Mezun Olunan Üniversite:</strong> {lawyerDetails.university}</p>
                        {lawyerDetails.masterDegree && <p><strong>Yüksek Lisans / Doktora:</strong> {lawyerDetails.masterDegree}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
                <CardHeader>
                    <CardTitle>İletişim & Konum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                         <Phone className="h-5 w-5 text-primary" />
                         <a href={`tel:${lawyerDetails.phone}`} className="hover:underline">{lawyerDetails.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                         <Mail className="h-5 w-5 text-primary" />
                         <a href={`mailto:${lawyerDetails.email}`} className="hover:underline">{lawyerDetails.email}</a>
                    </div>
                     <div className="flex items-start gap-3"> {/* Changed to items-start for address */}
                         <MapPin className="h-5 w-5 text-primary mt-1" />
                         <p>{lawyerDetails.officeAddress}</p>
                    </div>
                     {/* Optional: Add a map preview or link here */}
                </CardContent>
            </Card>
        </div>

    </div>
  );
}

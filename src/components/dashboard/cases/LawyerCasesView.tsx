
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Clock, MapPin, Eye, PlusCircle, ArrowLeft, ArrowRight, User, Phone, Mail, Building, Banknote, ShieldAlert, Home, UserCircle, GraduationCap, Search, Trash2 } from "lucide-react"; // Added Search, Trash2
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"; // Removed DialogOverlay as it's part of DialogContent
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useAuth } from '@/context/AuthContext'; // Import useAuth to potentially get lawyer info
import { Badge } from "@/components/ui/badge"; // Import Badge

// --- Sample Data ---

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
];

// Simulated logged-in lawyer data (replace with actual auth data)
const loggedInLawyer = {
  id: "lawyerLoggedIn",
  name: "Av. Giriş Yapan",
  barId: "112233445",
  imageUrl: "https://picsum.photos/seed/lawyerLoggedIn/40/40",
  initials: "GY",
};

// Simulated list of searchable lawyers (replace with actual data source)
const allLawyers = [
  { id: "l1", name: "Av. Ayşe Yılmaz", barId: "231307114", imageUrl: "https://picsum.photos/seed/lawyer1/40/40", initials: "AY" },
  { id: "l2", name: "Av. Mehmet Öztürk", barId: "123456789", imageUrl: "https://picsum.photos/seed/lawyer2/40/40", initials: "MÖ" },
  { id: "l3", name: "Av. Zeynep Kaya", barId: "987654321", imageUrl: "https://picsum.photos/seed/lawyer3/40/40", initials: "ZK" },
  { id: "l4", name: "Av. Hasan Demir", barId: "555666777", imageUrl: "https://picsum.photos/seed/lawyer4/40/40", initials: "HD" },
];

// --- Component ---

export default function LawyerCasesView() {
  const { userRole } = useAuth(); // Use auth context if needed later
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // Step for the multi-step form

  // State for client form data
  const [clientData, setClientData] = useState({
    firstName: '', lastName: '', tcKimlik: '', birthDate: undefined as Date | undefined,
    email: '', phone: '', address: '', companyName: '', title: '',
    iban: '', bankName: '', paymentMethod: '', emergencyContactName: '',
    emergencyContactRelationship: '', emergencyContactPhone: '',
  });

  // State for lawyer information
  const [primaryLawyer] = useState(loggedInLawyer); // Primary lawyer is the logged-in one
  const [additionalLawyers, setAdditionalLawyers] = useState<typeof loggedInLawyer[]>([]);

  // State for Step 3 (Case Info) - Placeholder
  const [caseData, setCaseData] = useState({
      caseName: '',
      caseDescription: '',
      // Add other case fields here
  });

  // State for Add Lawyer Dialog
  const [addLawyerDialogOpen, setAddLawyerDialogOpen] = useState(false);
  const [lawyerSearchQuery, setLawyerSearchQuery] = useState("");

  // Handle input changes for client form
  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setClientData(prev => ({ ...prev, [id]: value }));
  };

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
      setClientData(prev => ({ ...prev, [id]: value }));
  };

  // Handle date changes
  const handleDateChange = (id: string, date: Date | undefined) => {
      setClientData(prev => ({ ...prev, [id]: date }));
  };

  // Handle input changes for case form (Step 3)
  const handleCaseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setCaseData(prev => ({ ...prev, [id]: value }));
  };

  // Navigation handlers
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  // Reset forms and close dialog
  const resetAndClose = () => {
      setOpen(false);
      setStep(1);
      setClientData({
        firstName: '', lastName: '', tcKimlik: '', birthDate: undefined,
        email: '', phone: '', address: '', companyName: '', title: '',
        iban: '', bankName: '', paymentMethod: '', emergencyContactName: '',
        emergencyContactRelationship: '', emergencyContactPhone: '',
      });
      setAdditionalLawyers([]);
      setCaseData({ caseName: '', caseDescription: '' });
  };

  const handleSave = () => {
      // Logic to save all collected data
      console.log("Saving data:", { clientData, primaryLawyer, additionalLawyers, caseData });
      resetAndClose();
  };

  // Add Lawyer Logic
  const handleAddLawyer = (lawyerToAdd: typeof loggedInLawyer) => {
      // Prevent adding the primary lawyer or duplicates
      if (lawyerToAdd.id !== primaryLawyer.id && !additionalLawyers.some(l => l.id === lawyerToAdd.id)) {
          setAdditionalLawyers(prev => [...prev, lawyerToAdd]);
      }
      setAddLawyerDialogOpen(false); // Close the search dialog
      setLawyerSearchQuery(""); // Reset search
  };

  // Remove Lawyer Logic
  const handleRemoveLawyer = (lawyerIdToRemove: string) => {
       setAdditionalLawyers(prev => prev.filter(l => l.id !== lawyerIdToRemove));
  };

  // Filter lawyers for search
  const filteredLawyers = allLawyers.filter(lawyer =>
      lawyer.name.toLowerCase().includes(lawyerSearchQuery.toLowerCase()) &&
      lawyer.id !== primaryLawyer.id && // Exclude primary lawyer
      !additionalLawyers.some(al => al.id === lawyer.id) // Exclude already added lawyers
  );


  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <div className="flex items-center gap-4">
           <Briefcase className="h-8 w-8 text-primary" />
           <h1 className="text-3xl font-bold text-primary">Müvekkil Davaları</h1>
         </div>
         {/* Add New Case Button */}
         <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetAndClose(); else setOpen(true); }}>
            <DialogTrigger asChild>
               <Button className="bg-accent hover:bg-accent/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Yeni Dava Oluştur
               </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-primary">Yeni Dava Oluştur</DialogTitle>
               </DialogHeader>

               {/* Step 1: Müvekkil Bilgileri */}
               {step === 1 && (
                  <div className="space-y-6 p-2">
                     <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-primary flex items-center gap-2"><UserCircle className="h-5 w-5" /> 1. Müvekkil Bilgileri</h3>

                     {/* Temel Kimlik Bilgileri */}
                     <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                         <h4 className="font-medium text-primary mb-3 flex items-center gap-2"><GraduationCap className="h-4 w-4"/> Temel Kimlik Bilgileri</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <Label htmlFor="firstName">Ad</Label>
                               <Input id="firstName" placeholder="Müvekkil Adı" value={clientData.firstName} onChange={handleClientInputChange} />
                            </div>
                            <div className="space-y-2">
                               <Label htmlFor="lastName">Soyad</Label>
                               <Input id="lastName" placeholder="Müvekkil Soyadı" value={clientData.lastName} onChange={handleClientInputChange} />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="tcKimlik">T.C. Kimlik No</Label>
                                <Input id="tcKimlik" placeholder="11 Haneli T.C. Kimlik Numarası" value={clientData.tcKimlik} onChange={handleClientInputChange} maxLength={11} />
                             </div>
                            <div className="space-y-2">
                                <Label htmlFor="birthDate">Doğum Tarihi</Label>
                                <DatePicker date={clientData.birthDate} setDate={(date) => handleDateChange('birthDate', date)} />
                            </div>
                         </div>
                     </div>

                     {/* İletişim Bilgileri */}
                     <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                         <h4 className="font-medium text-primary mb-3 flex items-center gap-2"><Phone className="h-4 w-4" /> İletişim Bilgileri</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="email">E-posta Adresi</Label>
                                <Input id="email" type="email" placeholder="ornek@mail.com" value={clientData.email} onChange={handleClientInputChange} />
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Telefon Numarası</Label>
                                <Input id="phone" type="tel" placeholder="+90 555 123 4567" value={clientData.phone} onChange={handleClientInputChange} />
                             </div>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center gap-1"><Home className="h-4 w-4"/> Adres (İkametgah)</Label>
                            <Textarea id="address" placeholder="Müvekkilin ikametgah adresi..." value={clientData.address} onChange={handleClientInputChange} />
                         </div>
                     </div>

                     {/* Mesleki & Kurumsal Bilgiler */}
                     <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                         <h4 className="font-medium text-primary mb-3 flex items-center gap-2"><Building className="h-4 w-4"/> Mesleki & Kurumsal Bilgiler</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="companyName">Çalıştığı Kurum / Şirket Adı</Label>
                                <Input id="companyName" placeholder="Şirket Adı (varsa)" value={clientData.companyName} onChange={handleClientInputChange} />
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="title">Görev / Unvan</Label>
                                <Input id="title" placeholder="Görevi (varsa)" value={clientData.title} onChange={handleClientInputChange} />
                             </div>
                         </div>
                     </div>

                     {/* Hukuki / Mali Bilgiler */}
                     <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                        <h4 className="font-medium text-primary mb-3 flex items-center gap-2"><Banknote className="h-4 w-4" /> Hukuki / Mali Bilgiler</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="iban">IBAN</Label>
                                <Input id="iban" placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX" value={clientData.iban} onChange={handleClientInputChange} />
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="bankName">Banka Adı</Label>
                                <Input id="bankName" placeholder="IBAN'ın Ait Olduğu Banka" value={clientData.bankName} onChange={handleClientInputChange} />
                             </div>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="paymentMethod">Tercih Edilen Ödeme Yöntemi</Label>
                            <Select value={clientData.paymentMethod} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                                <SelectTrigger id="paymentMethod">
                                <SelectValue placeholder="Ödeme Yöntemi Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="havale">Havale/EFT</SelectItem>
                                <SelectItem value="kredi_karti">Kredi Kartı</SelectItem>
                                <SelectItem value="nakit">Nakit</SelectItem>
                                <SelectItem value="diger">Diğer</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                     </div>

                     {/* Acil Durum & İletişim Yetkilisi */}
                     <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                         <h4 className="font-medium text-primary mb-3 flex items-center gap-2"><ShieldAlert className="h-4 w-4"/> Acil Durum İletişim Yetkilisi</h4>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContactName">Ad Soyad</Label>
                                <Input id="emergencyContactName" placeholder="İsim" value={clientData.emergencyContactName} onChange={handleClientInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContactRelationship">Yakınlık Derecesi</Label>
                                <Input id="emergencyContactRelationship" placeholder="Eşi, Kardeşi vb." value={clientData.emergencyContactRelationship} onChange={handleClientInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContactPhone">Telefon Numarası</Label>
                                <Input id="emergencyContactPhone" type="tel" placeholder="+90 5xx xxx xx xx" value={clientData.emergencyContactPhone} onChange={handleClientInputChange} />
                            </div>
                         </div>
                     </div>
                  </div>
               )}

                {/* Step 2: Avukat Bilgileri */}
               {step === 2 && (
                   <div className="space-y-6 p-2">
                     <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-primary flex items-center gap-2"><User className="h-5 w-5" /> 2. Avukat Bilgileri</h3>

                     {/* Primary Lawyer (Logged In) - Display Only */}
                     <div className="p-4 border rounded-lg bg-primary/5">
                         <h4 className="font-medium text-primary mb-3">Birincil Avukat (Siz)</h4>
                         <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10 border">
                                <AvatarImage src={primaryLawyer.imageUrl} alt={primaryLawyer.name} data-ai-hint="lawyer person" />
                                <AvatarFallback>{primaryLawyer.initials}</AvatarFallback>
                             </Avatar>
                             <div>
                                 <p className="font-semibold">{primaryLawyer.name}</p>
                                 <p className="text-sm text-muted-foreground">Baro Sicil No: {primaryLawyer.barId}</p>
                             </div>
                         </div>
                     </div>

                     {/* Additional Lawyers */}
                     <div className="p-4 border rounded-lg bg-primary/5">
                          <h4 className="font-medium text-primary mb-3">Eklenen Diğer Avukatlar</h4>
                          {additionalLawyers.length > 0 ? (
                              <div className="space-y-3">
                                  {additionalLawyers.map((lawyer) => (
                                      <div key={lawyer.id} className="flex items-center justify-between p-2 border rounded-md bg-background">
                                         <div className="flex items-center gap-3">
                                             <Avatar className="h-8 w-8 border">
                                                <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} data-ai-hint="lawyer person" />
                                                <AvatarFallback className="text-xs">{lawyer.initials}</AvatarFallback>
                                             </Avatar>
                                             <div>
                                                 <p className="text-sm font-medium">{lawyer.name}</p>
                                                 <p className="text-xs text-muted-foreground">Baro No: {lawyer.barId}</p>
                                             </div>
                                          </div>
                                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8" onClick={() => handleRemoveLawyer(lawyer.id)}>
                                              <Trash2 className="h-4 w-4" />
                                              <span className="sr-only">Avukatı Kaldır</span>
                                          </Button>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <p className="text-sm text-muted-foreground">Henüz başka avukat eklenmedi.</p>
                          )}

                         {/* Add Lawyer Button -> Opens Sub-Dialog */}
                         <Dialog open={addLawyerDialogOpen} onOpenChange={setAddLawyerDialogOpen}>
                             <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="mt-4">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Avukat Ekle
                                </Button>
                             </DialogTrigger>
                             <DialogContent className="sm:max-w-[425px]">
                                 <DialogHeader>
                                     <DialogTitle>Avukat Ara ve Ekle</DialogTitle>
                                 </DialogHeader>
                                 <div className="py-4 space-y-4">
                                     <div className="relative">
                                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input
                                             id="lawyer-search"
                                             placeholder="Avukat adıyla ara..."
                                             value={lawyerSearchQuery}
                                             onChange={(e) => setLawyerSearchQuery(e.target.value)}
                                             className="pl-9"
                                         />
                                     </div>
                                     <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                                         {filteredLawyers.length > 0 ? (
                                             filteredLawyers.map(lawyer => (
                                                 <div key={lawyer.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                                                     <div className="flex items-center gap-2">
                                                         <Avatar className="h-8 w-8 border">
                                                             <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} data-ai-hint="lawyer person"/>
                                                             <AvatarFallback className="text-xs">{lawyer.initials}</AvatarFallback>
                                                         </Avatar>
                                                         <div>
                                                            <p className="text-sm font-medium">{lawyer.name}</p>
                                                            <p className="text-xs text-muted-foreground">Baro No: {lawyer.barId}</p>
                                                         </div>
                                                     </div>
                                                     <Button size="sm" variant="outline" onClick={() => handleAddLawyer(lawyer)}>
                                                         Ekle
                                                     </Button>
                                                 </div>
                                             ))
                                         ) : (
                                             <p className="text-center text-sm text-muted-foreground pt-4">
                                                 {lawyerSearchQuery ? "Eşleşen avukat bulunamadı." : "Aramaya başlayın."}
                                             </p>
                                         )}
                                     </div>
                                 </div>
                                 <DialogFooter>
                                      <Button variant="outline" onClick={() => setAddLawyerDialogOpen(false)}>Kapat</Button>
                                 </DialogFooter>
                             </DialogContent>
                         </Dialog>
                     </div>
                  </div>
               )}

               {/* Step 3: Dava Bilgileri */}
               {step === 3 && (
                 <div className="space-y-6 p-2">
                     <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-primary flex items-center gap-2"><Briefcase className="h-5 w-5" /> 3. Dava Bilgileri</h3>
                     <div className="p-4 border rounded-lg bg-primary/5">
                         <div className="space-y-2">
                            <Label htmlFor="caseName">Dava Adı/Türü</Label>
                            <Input id="caseName" placeholder="Örn: Boşanma Davası, Ceza Davası" value={caseData.caseName} onChange={handleCaseInputChange}/>
                         </div>
                         <div className="mt-4 space-y-2">
                            <Label htmlFor="caseDescription">Dava Açıklaması</Label>
                            <Textarea id="caseDescription" placeholder="Dava hakkında kısa bir açıklama..." value={caseData.caseDescription} onChange={handleCaseInputChange}/>
                         </div>
                         {/* Add more fields related to the case itself here */}
                         {/* Example: Court Name, File Number, Start Date etc. */}
                     </div>
                  </div>
               )}

               {/* Navigation Footer */}
               <DialogFooter className="mt-6 pt-4 border-t">
                  {step > 1 && (
                     <Button type="button" variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Geri
                     </Button>
                  )}
                  {step < 3 ? (
                     <Button type="button" onClick={handleNext}>
                        İleri <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  ) : (
                     <Button type="button" onClick={handleSave} className="bg-accent hover:bg-accent/80">
                        Davayı Kaydet
                     </Button>
                  )}
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>


      {/* Devam Eden Davalar Listesi */}
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

      {/* Tamamlanmış Davalar Listesi */}
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

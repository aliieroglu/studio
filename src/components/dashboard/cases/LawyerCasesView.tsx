
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function LawyerCasesView() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Müvekkil Davaları (Avukat Görünümü)</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Atanmış Davalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bu alanda avukat olarak size atanmış müvekkil davaları listelenecektir.
            Burada dava ekleme, müvekkil atama, dava detaylarını yönetme gibi
            işlevler yer alacaktır.
          </p>
          {/* Placeholder content for lawyer's view */}
          <div className="mt-4 border rounded-lg p-4 bg-muted/30">
             Müvekkil A - Dava X - Sonraki Duruşma: 20/09/2024
          </div>
          <div className="mt-4 border rounded-lg p-4 bg-muted/30">
             Müvekkil B - Dava Y - Durum: Karar Bekleniyor
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
          <CardTitle>Arşivlenmiş Davalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Burada tamamlanmış veya arşivlenmiş davalar listelenecektir.</p>
        </CardContent>
      </Card>
       {/* Add components specific to Lawyer's workflow, e.g., Add New Case Button */}
       {/* <Button className="mt-6 bg-accent hover:bg-accent/90">Yeni Dava Oluştur</Button> */}
    </div>
  );
}

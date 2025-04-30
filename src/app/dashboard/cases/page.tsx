import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function CasesPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="flex items-center gap-4 mb-8">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Davalarım</h1>
       </div>
      <Card>
        <CardHeader>
          <CardTitle>Devam Eden Davalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Burada devam eden davalarınız listelenecektir.</p>
           {/* Placeholder content */}
          <div className="mt-4 border rounded-lg p-4">
             Dava XYZ - Durum: İncelemede
          </div>
           <div className="mt-4 border rounded-lg p-4">
             Dava ABC - Durum: Karar Bekleniyor
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tamamlanmış Davalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Burada tamamlanmış davalarınız listelenecektir.</p>
        </CardContent>
      </Card>
    </div>
  );
}

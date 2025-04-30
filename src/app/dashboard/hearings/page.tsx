import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function HearingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Scale className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Duruşmalarım</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Duruşmalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Burada yaklaşan duruşmalarınız listelenecektir.</p>
          {/* Placeholder content */}
          <div className="mt-4 border rounded-lg p-4">
             Duruşma 1 - 15/08/2024 10:00 - İstanbul Adliyesi
          </div>
           <div className="mt-4 border rounded-lg p-4">
             Duruşma 2 - 22/08/2024 14:30 - Ankara Adliyesi
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
          <CardTitle>Geçmiş Duruşmalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Burada geçmiş duruşmalarınız listelenecektir.</p>
        </CardContent>
      </Card>
    </div>
  );
}

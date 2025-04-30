import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="flex items-center gap-4 mb-8">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Ayarlar</h1>
       </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Uygulama Ayarları</CardTitle>
          <CardDescription>Tercihlerinizi buradan yönetin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
             <div>
                <Label htmlFor="notifications" className="font-semibold">Bildirimler</Label>
                <p className="text-sm text-muted-foreground">
                    Yeni duruşma veya dava güncellemeleri için bildirim alın.
                </p>
             </div>
             <Switch id="notifications" aria-label="Bildirimleri aç/kapat" />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
             <div>
                <Label htmlFor="dark-mode" className="font-semibold">Koyu Mod</Label>
                <p className="text-sm text-muted-foreground">
                    Uygulama görünümünü koyu moda değiştirin.
                </p>
             </div>
             {/* Basic switch, full theme toggle needs more setup */}
             <Switch id="dark-mode" aria-label="Koyu modu aç/kapat" />
          </div>
          {/* Add more settings as needed */}
           <Button className="mt-4 bg-accent hover:bg-accent/90">Ayarları Kaydet</Button>
        </CardContent>
      </Card>
    </div>
  );
}

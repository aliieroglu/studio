import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ConnectionsPage() {
  // In a real app, determine the title based on the user's role
  const pageTitle = "Avukatlarım / Müvekkillerim";

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">{pageTitle}</h1>
      </div>
      <Card>
        <CardHeader>
          {/* Dynamically set title based on role */}
          <CardTitle>Bağlantı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Burada {pageTitle.toLowerCase()} listelenecektir.
          </p>
           {/* Placeholder content */}
          <div className="mt-4 border rounded-lg p-4">
             Av. Ayşe Demir - Ceza Hukuku
          </div>
           <div className="mt-4 border rounded-lg p-4">
             Müvekkil Ali Veli - Ticari Dava
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

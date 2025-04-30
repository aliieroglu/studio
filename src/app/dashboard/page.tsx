
'use client'; // Required because we use hooks (useAuth)

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scale, Users, Briefcase, LayoutDashboard } from "lucide-react"; // Added LayoutDashboard
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

// Navigation Items Definition (same as in layout for consistency)
const navItems = {
  client: [
    { href: "/dashboard/hearings", title: "Duruşmalarım", description: "Yaklaşan ve geçmiş duruşmalarınızı görüntüleyin.", icon: Scale },
    { href: "/dashboard/connections", title: "Avukatlarım", description: "İlişkili avukatlarınızı yönetin.", icon: Users },
    { href: "/dashboard/cases", title: "Davalarım", description: "Devam eden ve tamamlanmış davalarınızı takip edin.", icon: Briefcase },
  ],
  lawyer: [
    { href: "/dashboard/hearings", title: "Duruşmalar", description: "Müvekkil duruşmalarını yönetin.", icon: Scale },
    { href: "/dashboard/connections", title: "Müvekkillerim", description: "Müvekkil ilişkilerinizi yönetin.", icon: Users },
    { href: "/dashboard/cases", title: "Müvekkil Davaları", description: "Müvekkillerinize ait davaları takip edin.", icon: Briefcase },
    // Add lawyer-specific items here, e.g., Billing
  ],
};


export default function DashboardPage() {
  const { userRole } = useAuth();

   // Optional: Loading state
   if (!userRole) {
     return (
       <div className="container mx-auto py-8">
         <Skeleton className="h-10 w-1/3 mb-8" />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3].map((i) => (
             <Card key={i} className="h-48">
               <CardHeader>
                 <Skeleton className="h-6 w-3/4 mb-2" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-2/3" />
               </CardHeader>
             </Card>
           ))}
         </div>
       </div>
     );
   }


  const currentNavItems = navItems[userRole];

  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl font-bold text-primary mb-8">Gösterge Paneli</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentNavItems.map((item) => (
          <Link href={item.href} key={item.title} prefetch={false}>
            <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-transparent hover:border-accent group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <item.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

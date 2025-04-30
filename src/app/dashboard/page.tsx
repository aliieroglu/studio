import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scale, Users, Briefcase } from "lucide-react"; // Import icons

export default function DashboardPage() {
  const navigationItems = [
    {
      title: "Duruşmalarım",
      description: "Yaklaşan ve geçmiş duruşmalarınızı görüntüleyin.",
      href: "/dashboard/hearings",
      icon: <Scale className="h-6 w-6 text-primary" />,
    },
    {
      title: "Avukatlarım / Müvekkillerim", // Updated title based on role
      description: "İlişkili avukatlarınızı veya müvekkillerinizi yönetin.",
      href: "/dashboard/connections", // Simplified route
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Davalarım",
      description: "Devam eden ve tamamlanmış davalarınızı takip edin.",
      href: "/dashboard/cases",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl font-bold text-primary mb-8">Gösterge Paneli</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.title} prefetch={false}>
            <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-transparent hover:border-accent group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  {item.icon}
                  <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              {/* Optional CardContent or CardFooter if needed */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

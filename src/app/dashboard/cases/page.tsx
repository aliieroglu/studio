
'use client'; // Required because we use hooks (useAuth)

import { useAuth } from '@/context/AuthContext';
import ClientCasesView from '@/components/dashboard/cases/ClientCasesView';
import LawyerCasesView from '@/components/dashboard/cases/LawyerCasesView';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export default function CasesPage() {
  const { userRole } = useAuth();

  // Optional: Add a loading state while auth context is initializing
  if (!userRole) {
    return (
       <div className="container mx-auto py-8 space-y-6">
         <Skeleton className="h-10 w-1/3" />
         <Skeleton className="h-64 w-full" />
         <Skeleton className="h-10 w-1/4" />
         <Skeleton className="h-48 w-full" />
       </div>
     );
  }

  return (
    <>
      {userRole === 'client' && <ClientCasesView />}
      {userRole === 'lawyer' && <LawyerCasesView />}
    </>
  );
}

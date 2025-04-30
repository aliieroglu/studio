
'use client'; // Required because we use hooks (useAuth)

import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import ClientConnectionsView from '@/components/dashboard/connections/ClientConnectionsView'; // Import Client View
import LawyerConnectionsView from '@/components/dashboard/connections/LawyerConnectionsView'; // Import Lawyer View

export default function ConnectionsPage() {
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
      {userRole === 'client' && <ClientConnectionsView />}
      {userRole === 'lawyer' && <LawyerConnectionsView />}
    </>
  );
}

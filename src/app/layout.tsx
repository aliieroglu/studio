
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed font to Inter for a more modern feel
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Use Inter font variable
});

export const metadata: Metadata = {
  title: 'LexFlow - Avukatlık Bürosu Yönetim Sistemi', // Updated title
  description: 'Avukatlık Bürosu Yönetim Sistemi', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning> {/* Added lang="tr" */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable // Use Inter font
        )}
      >
        <AuthProvider> {/* Wrap children with AuthProvider */}
          {children}
          <Toaster /> {/* Add Toaster */}
        </AuthProvider>
      </body>
    </html>
  );
}

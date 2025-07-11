import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { FeedbackProvider } from '@/contexts/FeedbackContext';
import { FeedbackMessages } from '@/components/FeedbackMessages';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard - Car Rental Management',
  description: 'Admin dashboard for managing car rental listings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FeedbackProvider>
            {children}
            <FeedbackMessages />
          </FeedbackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
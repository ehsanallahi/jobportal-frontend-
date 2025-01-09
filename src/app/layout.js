'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      router.push('/'); // Redirect unauthenticated users
    }
  }, [router]);

  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

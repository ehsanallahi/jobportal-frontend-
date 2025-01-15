'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    // Define restricted pages
    const restrictedPages = ['/dashboard', '/profile', '/settings'];

    // Redirect only if the user is on a restricted page and not authenticated
    if (!jwt && restrictedPages.includes(pathname)) {
      router.push('/'); // Redirect unauthenticated users to the default page
    }
  }, [router, pathname]);

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

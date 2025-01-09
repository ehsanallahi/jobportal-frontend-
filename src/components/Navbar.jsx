'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Import icons from Heroicons

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setIsLoggedIn(!!jwt); // Set `isLoggedIn` to true if JWT exists

    // Check the current theme mode
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Clear JWT
    setIsLoggedIn(false); // Update state
    router.push('/login'); // Redirect to login page
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode((prev) => !prev); // Update theme state
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Job Portal</h1>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <Button variant="ghost" onClick={toggleTheme}>
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-500" aria-hidden="true" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-100" aria-hidden="true" />
            )}
          </Button>

          {/* Logout Button */}
          {isLoggedIn && (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

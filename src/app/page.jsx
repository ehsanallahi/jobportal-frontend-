'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
          <p className="text-lg mb-6">
            Your one-stop solution to find your dream job or the perfect candidate for your team.
          </p>
          <div className="space-x-4">
            <Link href="/jobs">
              <Button variant="primary" className="px-6 py-3 text-lg">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" className="px-6 py-3 text-lg">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <FaSearch size={32} className="text-blue-500 mb-4 mx-auto" />
                <CardTitle className="text-xl font-semibold">Find Jobs Easily</CardTitle>
              </CardHeader>
              <CardContent>
                Discover thousands of job opportunities tailored to your skills and preferences.
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <FaBriefcase size={32} className="text-green-500 mb-4 mx-auto" />
                <CardTitle className="text-xl font-semibold">Post Jobs Quickly</CardTitle>
              </CardHeader>
              <CardContent>
                Reach top talents by posting job openings with just a few clicks.
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <FaUsers size={32} className="text-purple-500 mb-4 mx-auto" />
                <CardTitle className="text-xl font-semibold">Build Connections</CardTitle>
              </CardHeader>
              <CardContent>
                Connect with employers or job seekers and grow your professional network.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
          <p className="text-lg mb-8">
            Whether you are looking for a job or looking to hire, we've got you covered.
          </p>
          <div className="space-x-4">
            <Link href="/jobs">
              <Button variant="primary" className="px-6 py-3 text-lg">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" className="px-6 py-3 text-lg">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-200 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Job Portal. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>{' '}
            |{' '}
            <Link href="/jobs" className="text-blue-500 hover:underline">
              Browse Jobs
            </Link>{' '}
            |{' '}
            <Link href="/post-job" className="text-blue-500 hover:underline">
              Post a Job
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

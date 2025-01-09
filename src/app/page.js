'use client';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to JobPortal</h1>
          <p className="text-lg md:text-xl mb-6">
            Your gateway to finding the perfect job or the right candidate.
          </p>
          <div className="space-x-4">
            <Button variant="primary" className="text-lg px-6 py-3">
              Apply for Jobs
            </Button>
            <Button variant="secondary" className="text-lg px-6 py-3">
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About JobPortal</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            JobPortal connects job seekers with top companies, making the hiring process
            seamless, efficient, and effective. Whether you're a job seeker or an employer,
            we have the tools to meet your needs.
          </p>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose JobPortal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Intuitive interface for both job seekers and recruiters.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Verified Jobs</h3>
              <p className="text-gray-700 dark:text-gray-300">
                All job postings are verified for authenticity.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Advanced Filtering</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Find your dream job or perfect candidate with powerful filters.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our support team is available around the clock to help you.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Detailed Insights</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Access analytics and insights for better decision-making.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your data is protected with the highest security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Actions */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Started Today</h2>
          <div className="space-x-4">
            <Button variant="primary" className="text-lg px-6 py-3">
              Register Now
            </Button>
            <Button variant="secondary" className="text-lg px-6 py-3">
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

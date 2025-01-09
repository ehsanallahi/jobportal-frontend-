'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      window.location.href = '/login'; // Redirect to login if not authenticated
    } else {
      fetchUser(jwt);
    }
  }, []);

  const fetchUser = async (jwt) => {
    try {
      const user = await api.getCurrentUser(jwt);
      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio || 'No bio available',
        profilePicture: user.profilePicture
          ? `${BASE_URL}${user.profilePicture}`
          : '/placeholder.png',
        skills: user.skills || [],
        socialLinks: user.socialLinks || { twitter: '', linkedin: '', github: '' },
      });
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading dashboard...</p>;
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username}!</h1>

      {/* User Profile Section */}
      <section className="mb-6">
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Profile Picture */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user?.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
              <div>
                <p className="text-sm text-gray-500">Username: {user?.username}</p>
                <p className="text-sm text-gray-500">Email: {user?.email}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Bio:</strong> {user?.bio}
            </p>

            {/* Skills */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Skills:</strong> {user?.skills.length > 0 ? user.skills.join(', ') : 'No skills added'}
            </p>

            {/* Social Links */}
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>
                <strong>Twitter:</strong>{' '}
                {user?.socialLinks.twitter ? (
                  <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {user.socialLinks.twitter}
                  </a>
                ) : (
                  'Not added'
                )}
              </p>
              <p>
                <strong>LinkedIn:</strong>{' '}
                {user?.socialLinks.linkedin ? (
                  <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {user.socialLinks.linkedin}
                  </a>
                ) : (
                  'Not added'
                )}
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                {user?.socialLinks.github ? (
                  <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {user.socialLinks.github}
                  </a>
                ) : (
                  'Not added'
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-4">
              <Button variant="primary" onClick={() => window.location.href = '/profile'}>
                Update Profile
              </Button>
              <Button variant="secondary" onClick={() => window.location.href = '/jobs/create'}>
                Create New Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Jobs Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>
        {/* Integrate the RecentJobs component */}
      </section>

      {/* Applied Jobs Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
        {/* Integrate the AppliedJobs component */}
      </section>
    </main>
  );
}

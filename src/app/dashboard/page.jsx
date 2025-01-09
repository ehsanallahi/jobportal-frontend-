'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import StatisticsCard from './components/StatisticsCard';
import RecentJobs from './components/RecentJobs';
import AppliedJobs from './components/AppliedJobs';

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
      const res = await fetch('http://localhost:1337/api/users/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8">
      {/* User Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Username:</strong> {user?.username || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Bio:</strong> {user?.bio || 'No bio available'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Role:</strong> {user?.role?.name || 'N/A'}
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button onClick={() => (window.location.href = '/dashboard/profile')}>
                Update Profile
              </Button>
              <Button
                variant="primary"
                onClick={() => (window.location.href = '/dashboard/jobs/create')}
              >
                Create New Job
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsCard userId={user?.id} />
          </CardContent>
        </Card>
      </section>

     {/* Recent Jobs Section */}
     <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Jobs</h2>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/jobs'}
          >
            View All Jobs
          </Button>
        </div>
        <RecentJobs />
      </section>

      {/* Applied Jobs Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Applied Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <AppliedJobs userId={user?.id} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

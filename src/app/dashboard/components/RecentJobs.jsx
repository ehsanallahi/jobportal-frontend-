'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecentJobs({ userId }) {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentJobs();
  }, []);

  const fetchRecentJobs = async () => {
    try {
      const res = await fetch('http://localhost:1337/api/jobs?sort=createdAt:desc&pagination[limit]=5', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setRecentJobs(data?.data || []);
    } catch (err) {
      console.error('Failed to fetch recent jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!recentJobs.length) {
    return <p className="text-gray-500 dark:text-gray-300">No recent jobs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentJobs.map((job) => (
        <Card key={job.id} className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
            <p className="text-sm text-gray-500">{job.companyName}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Location:</strong> {job.address}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Salary:</strong> ${job.expectedSalary}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

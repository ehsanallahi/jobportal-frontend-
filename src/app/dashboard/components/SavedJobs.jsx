'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const res = await fetch(`http://localhost:1337/api/users/saved-jobs`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await res.json();
        setSavedJobs(data.savedJobs || []);
      } catch (err) {
        console.error('Failed to fetch saved jobs:', err);
      }
    };
    fetchSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    try {
      const jwt = localStorage.getItem('jwt');
      await fetch(`http://localhost:1337/api/users/remove-saved-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ jobId }),
      });
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error('Failed to remove job:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <Card key={job.id} className="bg-gray-50 dark:bg-gray-800 shadow-lg">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{job.companyName}</p>
                <p>{job.address}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveJob(job.id)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No saved jobs yet.</p>
        )}
      </div>
    </div>
  );
}

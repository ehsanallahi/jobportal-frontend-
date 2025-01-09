'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function AppliedJobs({ userId }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [userId]);

  const fetchAppliedJobs = async () => {
    try {
      const res = await fetch(`http://localhost:1337/api/applications?filters[userId]=${userId}`);
      const data = await res.json();
      setJobs(data?.data || []);
    } catch (err) {
      console.error('Failed to fetch applied jobs:', err);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <h3 className="text-lg font-semibold">{job.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{job.companyName}</p>
                <p>{job.status}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No jobs applied for yet.</p>
        )}
      </div>
    </section>
  );
}

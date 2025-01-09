'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';

export default function JobDetailsPage({ params }) {
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const jobId = params.id;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const data = await api.getJobDetails(jobId);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details. Please try again later.');
      }
    };
    fetchJobDetails();
  }, [jobId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-sm text-gray-500">{job.companyName}</p>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Location:</strong> {job.address}
          </p>
          <p>
            <strong>Salary:</strong> ${job.expectedSalary}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Experience Required:</strong> {job.experienceRequired} year(s)
          </p>
          <p>
            <strong>Application Deadline:</strong>{' '}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" onClick={() => console.log('Applying for job...')}>
            Apply Now
          </Button>
          <Button
            variant="secondary"
            className="ml-4"
            onClick={() => router.push('/jobs')}
          >
            Back to Listings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

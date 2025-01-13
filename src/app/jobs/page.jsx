'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { debounce } from 'lodash';

const BASE_URL = 'http://localhost:1337/api';

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    minSalary: 0,
    maxSalary: 1000000,
    jobType: 'all',
    experience: 'all',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      fetchJobs(filters);
      fetchAppliedJobs();
    }
  }, [jwt]);

  const fetchJobs = async (updatedFilters) => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (updatedFilters.keyword) query.append('filters[title][$contains]', updatedFilters.keyword);
      if (updatedFilters.minSalary) query.append('filters[expectedSalary][$gte]', updatedFilters.minSalary);
      if (updatedFilters.maxSalary) query.append('filters[expectedSalary][$lte]', updatedFilters.maxSalary);
      if (updatedFilters.jobType && updatedFilters.jobType !== 'all') query.append('filters[jobType][$eq]', updatedFilters.jobType);
      if (updatedFilters.experience && updatedFilters.experience !== 'all') query.append('filters[experienceRequired][$eq]', updatedFilters.experience);

      const apiUrl = `${BASE_URL}/jobs?${query.toString()}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data && Array.isArray(data.data)) {
        setJobs(data.data);
      } else {
        setJobs([]);
        setError('No jobs found.');
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('An error occurred while fetching jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/job-applications?populate=job`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await res.json();
      const appliedJobIds = data?.data?.map((application) => application.job?.id) || [];
      setAppliedJobs(appliedJobIds);
    } catch (err) {
      console.error('Failed to fetch applied jobs:', err);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const appliedAt = new Date().toISOString();
      const res = await fetch(`${BASE_URL}/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            job: jobId,
            status: 'applied',
            appliedAt,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error?.message || 'Failed to apply for the job.');
      }

      setAppliedJobs((prev) => [...prev, jobId]);
      alert('Successfully applied for the job!');
    } catch (err) {
      console.error('Failed to apply for the job:', err.message);
      alert(err.message);
    }
  };

  const handleFilterChange = debounce((key, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      fetchJobs(updatedFilters); // Trigger job fetch on filter change
      return updatedFilters;
    });
  }, 300);

  const isExpired = (deadline) => new Date(deadline) < new Date();

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Job Listings</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Input
          placeholder="Search by keyword..."
          value={filters.keyword}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Salary Range
          </label>
          <Slider
            value={[filters.minSalary, filters.maxSalary]}
            onValueChange={(value) => handleFilterChange('salaryRange', value)}
            min={0}
            max={200000}
            step={1000}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>${filters.minSalary}</span>
            <span>${filters.maxSalary}</span>
          </div>
        </div>
        <Select onValueChange={(value) => handleFilterChange('jobType', value)}>
          <SelectTrigger className="w-full">
            {filters.jobType === 'all' ? 'Job Type' : filters.jobType}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
            <SelectItem value="Permanent">Permanent</SelectItem>
            <SelectItem value="Contractual">Contractual</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('experience', value)}>
          <SelectTrigger className="w-full">
            {filters.experience === 'all' ? 'Experience Level' : filters.experience}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">1 Year</SelectItem>
            <SelectItem value="2">2 Years</SelectItem>
            <SelectItem value="3">3+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id} className="shadow-lg border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <p className="text-sm text-gray-500">{job.companyName}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Location:</strong> {job.address}</p>
                <p><strong>Salary:</strong> ${job.expectedSalary}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Experience:</strong> {job.experienceRequired} year(s)</p>
                <p><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {truncateText(job.description, 100)}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleApplyJob(job.id)}
                  disabled={appliedJobs.includes(job.id) || isExpired(job.applicationDeadline)}
                  variant={isExpired(job.applicationDeadline) ? 'outline' : appliedJobs.includes(job.id) ? 'outline' : 'primary'}
                >
                  {isExpired(job.applicationDeadline)
                    ? 'Expired'
                    : appliedJobs.includes(job.id)
                    ? 'Applied'
                    : 'Apply Now'}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found. Try adjusting your filters.</p>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const BASE_URL = 'http://localhost:1337/api/jobs';

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    minSalary: 0,
    maxSalary: 100000,
    jobType: 'all',
    experience: 'all',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJobs = async (updatedFilters) => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();

      // Add filters to query
      if (updatedFilters.keyword) query.append('filters[title][$contains]', updatedFilters.keyword);
      if (updatedFilters.minSalary) query.append('filters[expectedSalary][$gte]', updatedFilters.minSalary);
      if (updatedFilters.maxSalary) query.append('filters[expectedSalary][$lte]', updatedFilters.maxSalary);
      if (updatedFilters.jobType && updatedFilters.jobType !== 'all') query.append('filters[jobType][$eq]', updatedFilters.jobType);
      if (updatedFilters.experience && updatedFilters.experience !== 'all') query.append('filters[experienceRequired][$eq]', updatedFilters.experience);

      const apiUrl = `${BASE_URL}?${query.toString()}`;
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

  // Fetch jobs whenever filters change
  useEffect(() => {
    fetchJobs(filters);
  }, [JSON.stringify(filters)]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleApplyJob = async (jobId) => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        alert('You must be logged in to apply for jobs.');
        return;
      }
  
      // Fetch current user ID
      const userRes = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      if (!userRes.ok) {
        throw new Error('Failed to fetch user information.');
      }
  
      const user = await userRes.json();
  
      // Submit job application
      const res = await fetch('http://localhost:1337/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            user: user.id, // Replace with the exact field name from Strapi schema
            job: jobId,    // Replace with the exact field name from Strapi schema
            status: 'applied', // Default status for a new application
          },
        }),
      });
  
      const responseData = await res.json();
  
      if (!res.ok) {
        console.error('Response Error:', responseData);
        throw new Error(responseData?.error?.message || 'Failed to apply for the job');
      }
  
      alert('Successfully applied for the job!');
    } catch (err) {
      console.error('Failed to apply for the job:', err.message);
      alert(`Failed to apply for the job: ${err.message}`);
    }
  };
  
  
  
  
  
  
  
  
  
  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Job Listings</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Keyword Search */}
        <Input
          placeholder="Search by keyword"
          value={filters.keyword}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
        />

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Salary Range
          </label>
          <Slider
            value={[filters.minSalary, filters.maxSalary]}
            onValueChange={(value) => {
              handleFilterChange('minSalary', value[0]);
              handleFilterChange('maxSalary', value[1]);
            }}
            min={0}
            max={200000}
            step={1000}
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>${filters.minSalary}</span>
            <span>${filters.maxSalary}</span>
          </div>
        </div>

        {/* Job Type Filter */}
        <Select onValueChange={(value) => handleFilterChange('jobType', value)}>
          <SelectTrigger className="w-full">
            <span>{filters.jobType === 'all' || !filters.jobType ? 'Job Type' : filters.jobType}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
            <SelectItem value="Permanent">Permanent</SelectItem>
            <SelectItem value="Contractual">Contractual</SelectItem>
          </SelectContent>
        </Select>

        {/* Experience Filter */}
        <Select onValueChange={(value) => handleFilterChange('experience', value)}>
          <SelectTrigger className="w-full">
            <span>
              {filters.experience === 'all' || !filters.experience ? 'Experience Level' : filters.experience}
            </span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id} className="bg-gray-50 dark:bg-gray-800 shadow-lg">
              <CardHeader className="pb-2">
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
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Experience:</strong> {job.experienceRequired} year(s)
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Description:</strong> {truncateText(job.description, 100)}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" className="mr-2">
                  View Details
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleApplyJob(job.id)}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No jobs found. Try adjusting your filters.</p>
        )}
      </div>
    </main>
  );
}

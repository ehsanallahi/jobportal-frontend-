'use client';

import { useState } from 'react';
import { jobApi } from '@/utils/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    expectedSalary: '',
    jobType: '',
    experienceRequired: '',
    applicationDeadline: '',
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const jwt = localStorage.getItem('jwt');

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await jobApi.createJob(formData, jwt);
      setMessage('Job posted successfully!');
      setFormData({
        companyName: '',
        address: '',
        expectedSalary: '',
        jobType: '',
        experienceRequired: '',
        applicationDeadline: '',
        title: '',
        description: '',
      });
    } catch (err) {
      console.error('Failed to post job:', err);
      setError('Failed to post job. Please check the fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex my-10 justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Post a New Job</h1>
        </CardHeader>
        <CardContent>
          {message && <Alert className="mb-4">{message}</Alert>}
          {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              required
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              required
            />
            <Input
              placeholder="Expected Salary"
              type="number"
              value={formData.expectedSalary}
              onChange={(e) => handleChange('expectedSalary', e.target.value)}
              required
            />
            <Select
              onValueChange={(value) => handleChange('jobType', value)}
              value={formData.jobType}
              required
            >
              <SelectTrigger className="w-full">Select Job Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="Permanent">Permanent</SelectItem>
                <SelectItem value="Contractual">Contractual</SelectItem>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Experience Required (in years)"
              type="number"
              value={formData.experienceRequired}
              onChange={(e) => handleChange('experienceRequired', e.target.value)}
              required
            />
            <Input
              placeholder="Application Deadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => handleChange('applicationDeadline', e.target.value)}
              required
            />
            <Input
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
            <Textarea
              placeholder="Job Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              required
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

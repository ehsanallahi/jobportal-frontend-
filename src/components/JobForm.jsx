'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

export default function JobForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    companyName: initialData.companyName || '',
    address: initialData.address || '',
    expectedSalary: initialData.expectedSalary || '',
    jobType: initialData.jobType || '',
    experienceRequired: initialData.experienceRequired || '',
    lastDate: initialData.lastDate || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Company Name"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        required
      />
      <Input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="Expected Salary"
        value={form.expectedSalary}
        onChange={(e) => setForm({ ...form, expectedSalary: e.target.value })}
        required
      />
      <Select
        onValueChange={(value) => setForm({ ...form, jobType: value })}
        value={form.jobType}
        required
      >
        <SelectTrigger>Job Type</SelectTrigger>
        <SelectContent>
          <SelectItem value="Permanent">Permanent</SelectItem>
          <SelectItem value="Contractual">Contractual</SelectItem>
          <SelectItem value="Full Time">Full Time</SelectItem>
          <SelectItem value="Part Time">Part Time</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Experience Required (e.g., 2 years)"
        value={form.experienceRequired}
        onChange={(e) => setForm({ ...form, experienceRequired: e.target.value })}
        required
      />
      <Input
        type="date"
        placeholder="Last Date to Apply"
        value={form.lastDate}
        onChange={(e) => setForm({ ...form, lastDate: e.target.value })}
        required
      />
      <Button type="submit">Save</Button>
    </form>
  );
}

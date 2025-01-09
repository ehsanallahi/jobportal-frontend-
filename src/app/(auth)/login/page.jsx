'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.login(form);
      localStorage.setItem('jwt', data.jwt); // Save JWT
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium">Email or Username</label>
          <Input
            id="identifier"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="Enter your email or username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" variant="outline">Login</Button>
      </form>
    </div>
  );
}

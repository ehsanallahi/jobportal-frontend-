'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useTheme } from '@/components/ui/theme-provider'; // For theme toggle (if applicable)

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isRegistered = localStorage.getItem('isRegistered');
    if (!isRegistered) {
      router.push('/login');
    }
  }, [router]);

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
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium dark:text-white"
              >
                Email or Username
              </label>
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
              <label
                htmlFor="password"
                className="block text-sm font-medium dark:text-white"
              >
                Password
              </label>
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
            <Button type="submit" className="w-full" variant="outline">
              Login
            </Button>
          </form>
          <div className="mt-4 text-sm text-center dark:text-white">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push('/register')}
            >
              Register
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

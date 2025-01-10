'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import StatisticsCard from './components/StatisticsCard';
import RecentJobs from './components/RecentJobs';
import AppliedJobs from './components/AppliedJobs';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const BASE_URL = 'http://localhost:1337';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cvFiles, setCvFiles] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      window.location.href = '/login'; // Redirect to login if not authenticated
    } else {
      fetchUser(jwt);
    }
  }, []);

  const fetchUser = async (jwt) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/me?populate=cvFiles`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      const userData = await res.json();
      console.log('User Data:', userData); // Ensure cvFiles is present in the response
      setUser(userData);
      setCvFiles(userData.cvFiles || []); // Update cvFiles state
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCvUpload = async () => {
    setMessage('');
    setError('');

    if (!cvFile) {
      setError('Please select a CV file to upload.');
      return;
    }

    const jwt = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('files', cvFile);

    try {
      const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData,
      });

      const uploadedFiles = await uploadRes.json();

      if (!uploadRes.ok || !uploadedFiles.length) {
        throw new Error('Failed to upload CV.');
      }

      // Update the user's CV field in Strapi
      const updatedUserRes = await fetch(`${BASE_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvFiles: [...cvFiles, ...uploadedFiles.map((file) => file.id)], // Add file IDs to cvFiles
        }),
      });

      const updatedUser = await updatedUserRes.json();

      if (!updatedUserRes.ok) {
        throw new Error('Failed to update user profile with CV.');
      }

      setCvFiles(updatedUser.cvFiles || []);
      setMessage('CV uploaded successfully!');
      setCvFile(null);
    } catch (err) {
      console.error('Failed to upload CV:', err);
      setError(err.message || 'Failed to upload CV.');
    }
  };

  const handleCvDelete = async (fileId) => {
    setError('');
    setMessage('');
  
    const jwt = localStorage.getItem('jwt');
    try {
      const res = await fetch(`${BASE_URL}/api/upload/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      });
  
      if (!res.ok) {
        const responseError = await res.json(); // Capture response error message
        console.error('Delete Response:', responseError);
        throw new Error(responseError?.error?.message || 'Failed to delete CV.');
      }
  
      setCvFiles((prev) => prev.filter((file) => file.id !== fileId));
      setMessage('CV deleted successfully!');
    } catch (err) {
      console.error('Failed to delete CV:', err.message);
      setError(err.message || 'Failed to delete CV.');
    }
  };
  

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8">
      {/* User Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">User Profile</CardTitle>
          </CardHeader>
          <CardContent>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
    {/* Username */}
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</h3>
      <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
        {user?.username || 'N/A'}
      </p>
    </div>
    {/* Email */}
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
      <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
        {user?.email || 'N/A'}
      </p>
    </div>
    {/* Bio */}
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
      <p className="text-base text-gray-800 dark:text-gray-200">
        {user?.bio || 'No bio available'}
      </p>
    </div>
    {/* Skills */}
   <div className="flex flex-col space-y-4">
  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Skills</h3>
  {user?.skills && user.skills.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {user.skills.map((skill, index) => (
        <span
          key={index}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        >
          {skill}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-base text-gray-800 dark:text-gray-200">No skills available</p>
  )}
</div>

  </div>

  {/* Social Links */}
  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Social Links</h3>
    <div className="flex space-x-4">
      {user?.socialLinks?.twitter && (
        <a
          href={user.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 transition-colors"
        >
          <FaTwitter size={24} />
        </a>
      )}
      {user?.socialLinks?.linkedin && (
        <a
          href={user.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-800 dark:text-blue-500 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      )}
      {user?.socialLinks?.github && (
        <a
          href={user.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-800 dark:text-gray-400 transition-colors"
        >
          <FaGithub size={24} />
        </a>
      )}
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex justify-start space-x-4">
    <Button onClick={() => (window.location.href = '/dashboard/profile')} variant="outline">
      Update Profile
    </Button>
    <Button variant="primary" onClick={() => (window.location.href = '/dashboard/jobs/create')}>
      Create New Job
    </Button>
  </div>
</CardContent>

        </Card>

        {/* Dashboard Overview Section */}
        <Card className="bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsCard userId={user?.id} />
          </CardContent>
        </Card>
      </section>

    
     {/* CV Section */}
<section>
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-bold">Uploaded CVs</CardTitle>
    </CardHeader>
    <CardContent>
      {cvFiles.length > 0 ? (
        <ul className="space-y-4">
          {cvFiles.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
            >
              <a
                href={`${BASE_URL}${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {file.name}
              </a>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCvDelete(file.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No CVs uploaded yet.</p>
      )}
      <div className="mt-4">
        <input
          type="file"
          onChange={(e) => setCvFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 dark:text-gray-300"
        />
        <Button
          onClick={handleCvUpload}
          variant="primary"
          className="mt-2"
          disabled={!cvFile}
        >
          Upload CV
        </Button>
        {message && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">{message}</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </CardContent>
  </Card>
</section>


      {/* Recent Jobs Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Jobs</h2>
          <Button variant="outline" onClick={() => (window.location.href = '/jobs')}>
            View All Jobs
          </Button>
        </div>
        <RecentJobs />
      </section>

      
    </main>
  );
}

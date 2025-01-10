'use client';

import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    id: '',
    username: '',
    email: '',
    bio: '',
    profilePicture: '',
    skills: [],
    socialLinks: { twitter: '', linkedin: '', github: '' },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null); // For profile picture upload
  const jwt = localStorage.getItem('jwt');

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await api.getCurrentUser(jwt);
        setProfile({
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio || '',
          profilePicture: user.profilePicture
            ? `${BASE_URL}${user.profilePicture}` // Prepend BASE_URL to the picture URL
            : '', // Fallback to empty if no picture
          skills: user.skills || [],
          socialLinks: user.socialLinks || { twitter: '', linkedin: '', github: '' },
        });
      } catch (err) {
        setError('Failed to fetch profile. Please try again later.');
      }
    };

    fetchProfile();
  }, [jwt]);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const updatedProfile = await api.updateUserProfile(profile.id, {
        bio: profile.bio,
        skills: profile.skills,
        socialLinks: profile.socialLinks,
      }, jwt);
      setProfile((prev) => ({ ...prev, ...updatedProfile }));
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  // Handle profile picture upload
  const handleUploadPicture = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      const uploaded = await api.uploadProfilePicture(file, jwt);
      const uploadedFile = uploaded[0]; // Assuming single file upload
      const fullUrl = `${BASE_URL}${uploadedFile.url}`; // Prepend BASE_URL to uploaded file URL
      setProfile((prev) => ({ ...prev, profilePicture: fullUrl }));
      setMessage('Profile picture uploaded successfully!');
    } catch (err) {
      console.error('Error uploading profile picture:', err.message);
      setError('Failed to upload profile picture.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile Management</h1>

      {/* Alert Messages */}
      {message && <Alert className="mb-4">{message}</Alert>}
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}

      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Picture</label>
            <img
              src={profile.profilePicture || '/placeholder.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-2 block w-full text-sm text-gray-700 dark:text-gray-300"
            />
            <Button className="mt-2" onClick={handleUploadPicture}>
              Upload Picture
            </Button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <Input
              value={profile.skills.join(', ')}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, skills: e.target.value.split(', ') }))
              }
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Social Links</label>
            <Input
              value={profile.socialLinks.twitter}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                }))
              }
              placeholder="Twitter URL"
              className="mb-2"
            />
            <Input
              value={profile.socialLinks.linkedin}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                }))
              }
              placeholder="LinkedIn URL"
              className="mb-2"
            />
            <Input
              value={profile.socialLinks.github}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, github: e.target.value },
                }))
              }
              placeholder="GitHub URL"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdate} variant="primary">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

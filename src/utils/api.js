import axios from 'axios';

const BASE_URL = 'http://localhost:1337'; // Replace with your Strapi backend URL

export const api = {
  // User Registration
  register: async ({ username, email, password }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Registration failed');
    }
  },

  // User Login
  login: async ({ identifier, password }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/local`, {
        identifier,
        password,
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Login failed');
    }
  },

  // Get Current User Profile
  getCurrentUser: async (jwt) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to fetch user');
    }
  },

  // Update User Profile
  updateUserProfile: async (userId, data, jwt) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/users/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to update profile');
    }
  },

  // Upload Profile Picture
  uploadProfilePicture: async (file, jwt) => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to upload profile picture');
    }
  },
  // Update User CV Files
updateUserCVs: async (userId, cvFiles, jwt) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/users/${userId}`,
      {
        cvFiles, // This should be an array of file URLs from Strapi
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || 'Failed to update CV files');
  }
},


  // Fetch Job Details
  getJobDetails: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/jobs/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to fetch job details');
    }
  },
};

export const jobApi = {
  // Fetch all jobs with filters
  getJobs: async (filters = {}) => {
    try {
      const query = new URLSearchParams();

      // Add search filters dynamically
      if (filters.title_contains) query.append('filters[title][$contains]', filters.title_contains);
      if (filters.jobType) query.append('filters[jobType][$eq]', filters.jobType);
      if (filters.experienceRequired) query.append('filters[experienceRequired][$eq]', filters.experienceRequired);
      if (filters.companyName_contains) query.append('filters[companyName][$contains]', filters.companyName_contains);
      if (filters.minSalary) query.append('filters[expectedSalary][$gte]', filters.minSalary);
      if (filters.maxSalary) query.append('filters[expectedSalary][$lte]', filters.maxSalary);

      const res = await axios.get(`${BASE_URL}/api/jobs?${query.toString()}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to fetch jobs');
    }
  },

  // Create a new job
  createJob: async (data, jwt) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/jobs`, { data }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || 'Failed to create job');
    }
  },
    // Apply to a job
    applyJob: async (jobId, jwt) => {
      try {
        const res = await axios.post(`${BASE_URL}/api/job-applications`, {
          data: {
            job: jobId,
          },
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
  
        return res.data;
      } catch (err) {
        throw new Error(err.response?.data?.error?.message || 'Failed to apply for job');
      }
    },
};

// Logout Utility
export const logout = (router) => {
  localStorage.removeItem('jwt'); // Clear JWT token
  router.push('/login'); // Redirect to login page
};

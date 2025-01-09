'use client';

import { useEffect, useState } from 'react';

export default function StatisticsCard({ userId }) {
  const [stats, setStats] = useState({ postedJobs: 0, appliedJobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:1337/api/stats?userId=${userId}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow">
        <h3 className="text-lg font-bold">Jobs Posted</h3>
        <p className="text-2xl font-semibold">{stats.postedJobs}</p>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow">
        <h3 className="text-lg font-bold">Jobs Applied</h3>
        <p className="text-2xl font-semibold">{stats.appliedJobs}</p>
      </div>
    </div>
  );
}

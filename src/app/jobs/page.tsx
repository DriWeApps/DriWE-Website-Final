'use client';

import { useEffect, useState } from 'react';

interface Job {
  id: number;
  title: string;
  description: string;
  responsibilities: string;
  requiredSkills: string;
  education?: string;
  experience?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');

      const data = await res.json();

      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Open <span className="text-yellow-400">Positions</span>
        </h1>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {job.title}
              </h2>

              <p className="text-gray-300 mt-4">
                {job.description}
              </p>

              <div className="mt-4">
                <p className="font-semibold text-white">
                  Responsibilities:
                </p>

                <p className="text-gray-400 mt-1">
                  {job.responsibilities}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-white">
                  Required Skills:
                </p>

                <p className="text-gray-400 mt-1">
                  {job.requiredSkills}
                </p>
              </div>

              <div className="mt-4 flex gap-6 text-sm text-gray-400">
                <span>
                  Experience: {job.experience || 'Not specified'}
                </span>

                <span>
                  Education: {job.education || 'Not specified'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
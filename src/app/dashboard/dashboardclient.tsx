'use client';

import { useState, useEffect } from 'react';

// Define the expected Application type
interface Application {
  id: number;
  name: string;
  email: string;
  address?: string | null;
  dob?: Date | string | null;
  mobileNumber?: string | null;
  education?: string | null;
  experience?: string | null;
  position?: string | null;
  createdAt?: Date | string;
  resumePath?: string | null;
}

// Add a type for component props
interface DashboardClientProps {
  initialApplications?: Application[];
}

export default function DashboardClient({ initialApplications = [] }: DashboardClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApps() {
      try {
        setLoading(true);
        const res = await fetch('/api/applications');
        if (!res.ok) throw new Error('Failed to fetch applications');
        const data: Application[] = await res.json();
        setApplications(data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!applications.length) return <p>No application submitted yet</p>;

  // ✅ Helper to safely get full URL
  const getResumeUrl = (path?: string | null) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; // absolute URL (e.g., localhost:3001)
    return `${window.location.origin}${path}`; // relative path
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Applications</h2>
      <ul>
        {applications.map((app: Application) => {
          const resumeUrl = getResumeUrl(app.resumePath);
          return (
            <li
              key={app.id}
              className="border-b py-2 flex items-center justify-between"
            >
              <div>
                <p>
                  <strong>{app.name}</strong> — {app.email}
                </p>
                {app.position && (
                  <p className="text-sm text-gray-600">{app.position}</p>
                )}
              </div>

              {/* ✅ View Resume Button */}
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-gray-400">No Resume</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

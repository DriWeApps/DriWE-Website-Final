'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  email: string;
  gender?: string | null;
  mobileNumber?: string | null;
  education?: string | null;
  experience?: string | null;
  address?: string | null;
  position: string | null;
  createdAt: string;
  resumePath: string | null;
}

export default function DashboardPage() {


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [apps, setApps] = useState<Application[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/application', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };




  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const filtered = useMemo(() => {
    if (apps.length === 0) return [];
    if (!fromDate && !toDate) return apps;

    return apps.filter((app) => {
      const d = new Date(app.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      const after = !from || d >= from;
      const before = !to || d <= new Date(to.setHours(23, 59, 59, 999));
      return after && before;
    });
  }, [apps, fromDate, toDate]);

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
     {/* Top Bar */}
<div className="sticky top-0 z-50 flex justify-end p-6">
  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-500/25"
  >
    Logout
  </button>
</div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Total Applications</p>
            <p className="text-4xl font-bold text-white mt-2">{apps.length}</p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Filtered Results</p>
            <p className="text-4xl font-bold text-yellow-400 mt-2">{filtered.length}</p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-lg font-medium text-white mt-2">
              {mounted
                ? new Date().toLocaleTimeString('en-IN')
                : '--:--:--'}
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
            Filter Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-5 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-5 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
            </div>
          </div>
          {(fromDate || toDate) && (
            <button
              onClick={() => {
                setFromDate('');
                setToDate('');
              }}
              className="mt-4 text-sm text-yellow-400 hover:text-yellow-300 font-medium underline-offset-4 hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <p className="text-2xl text-gray-400">
              {apps.length === 0
                ? 'No applications submitted yet.'
                : 'No applications found in the selected date range.'}
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-yellow-400 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-5">Candidate</th>
                    <th className="px-6 py-5">Gender</th>
                    <th className="px-6 py-5">Contact</th>
                    <th className="px-6 py-5">Education</th>
                    <th className="px-6 py-5">Experience</th>
                    <th className="px-6 py-5">Address</th>
                    <th className="px-6 py-5">Position</th>
                    <th className="px-6 py-5">Applied On</th>
                    <th className="px-6 py-5">Resume</th>
                    <th className="px-6 py-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filtered.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-zinc-800/50 transition-all duration-300 group"
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white">
                          {app.name}
                        </div>
                      </td>

                      {/* Gender Column */}
                      <td className="px-6 py-5 text-gray-300">
                        {app.gender || '—'}
                      </td>

                      {/* Contact Column */}
                      <td className="px-6 py-5">
                        <div>
                          <a
                            href={`mailto:${app.email}`}
                            className="text-yellow-400 hover:underline font-medium"
                          >
                            {app.email}
                          </a>

                          {app.mobileNumber && (
                            <p className="text-gray-400 text-sm mt-1">
                              {app.mobileNumber}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Education */}
                      <td className="px-6 py-5 text-gray-300">
                        {app.education || '—'}
                      </td>

                      {/* Experience */}
                      <td className="px-6 py-5 text-gray-300">
                        {app.experience || '—'}
                      </td>

                      {/* Address */}
                      <td className="px-6 py-5 text-gray-300 max-w-[250px]">
                        <div className="truncate" title={app.address || ''}>
                          {app.address || '—'}
                        </div>
                      </td>


                      <td className="px-6 py-5">
                        <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                          {app.position || 'Not Specified'}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {new Date(app.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="px-6 py-5">
                        {app.resumePath ? (
                          <Link
                            href={app.resumePath}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium"
                          >
                            View Resume
                          </Link>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete application of ${app.name}?`)) return;

                            setDeletingId(app.id);

                            try {
                              const res = await fetch('/api/application', {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ id: app.id }),
                              });

                              if (res.ok) {
                                setApps((prev) =>
                                  prev.filter((a) => a.id !== app.id)
                                );
                              } else {
                                alert('Failed to delete');
                              }
                            } catch (err) {
                              console.error('Delete error:', err);
                              alert('Error deleting application');
                            } finally {
                              setDeletingId(null);
                            }
                          }}
                          disabled={deletingId === app.id}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${deletingId === app.id
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/30'
                            }`}
                        >
                          {deletingId === app.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-sm pb-8">
        © 2025 DriWE Smartech Pvt. Ltd.
      </div>
    </div>
  );
}


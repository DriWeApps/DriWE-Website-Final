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

  const [jobs, setJobs] = useState<any[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [postingJob, setPostingJob] = useState(false);

  const [apps, setApps] = useState<Application[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  // const filtered = useMemo(() => {
  //   if (apps.length === 0) return [];
  //   if (!fromDate && !toDate) return apps;

  //   return apps.filter((app) => {
  //     const d = new Date(app.createdAt);
  //     const from = fromDate ? new Date(fromDate) : null;
  //     const to = toDate ? new Date(toDate) : null;
  //     const after = !from || d >= from;
  //     const before = !to || d <= new Date(to.setHours(23, 59, 59, 999));
  //     return after && before;
  //   });
  // }, [apps, fromDate, toDate]);

  // const filtered = useMemo(() => {
  //   let result = [...apps];

  //   // Position filter
  //   if (selectedPosition) {
  //     result = result.filter(
  //       (app) => app.position === selectedPosition
  //     );
  //   }

  //   // Date filter
  //   if (fromDate || toDate) {
  //     result = result.filter((app) => {
  //       const d = new Date(app.createdAt);

  //       const from = fromDate
  //         ? new Date(fromDate)
  //         : null;

  //       const to = toDate
  //         ? new Date(toDate)
  //         : null;

  //       const after = !from || d >= from;

  //       const before =
  //         !to ||
  //         d <= new Date(
  //           new Date(toDate).setHours(
  //             23,
  //             59,
  //             59,
  //             999
  //           )
  //         );

  //       return after && before;
  //     });
  //   }

  //   return result;
  // }, [
  //   apps,
  //   fromDate,
  //   toDate,
  //   selectedPosition,
  // ]);

  const filtered = useMemo(() => {
  let data = apps;

  if (selectedPosition) {
    data = data.filter(
      (app) => app.position === selectedPosition
    );
  }

  if (fromDate || toDate) {
    data = data.filter((app) => {
      const d = new Date(app.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const after = !from || d >= from;
      const before =
        !to ||
        d <= new Date(
          new Date(to).setHours(23, 59, 59, 999)
        );

      return after && before;
    });
  }

  return data;
}, [apps, selectedPosition, fromDate, toDate]);
  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
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
            <button
              onClick={handleLogout}
              className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-md font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Job Posting Section */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            {editingJobId ? 'Edit Job' : 'Post New Job'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Job Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Experience
              </label>

              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="2+ Years"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="Job description..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-2">
                Responsibilities
              </label>

              <textarea
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="Responsibilities..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-2">
                Required Skills
              </label>

              <textarea
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="React, Next.js, Tailwind..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Education
              </label>

              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
                placeholder="Bachelor's Degree"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">

            <button
             onClick={async () => {
  try {

    if (
      !title.trim() ||
      !description.trim() ||
      !responsibilities.trim() ||
      !requiredSkills.trim() ||
      !education.trim() ||
      !experience.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    setPostingJob(true);

    const payload = {
      title,
      description,
      responsibilities,
      requiredSkills,
      education,
      experience,
    };

    let res;

                  if (editingJobId) {
                    res = await fetch('/api/jobs', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        jobId: editingJobId,
                        ...payload,
                      }),
                    });
                  } else {
                    res = await fetch('/api/jobs', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(payload),
                    });
                  }

                  const data = await res.json();

                  if (res.ok) {
                    alert(
                      editingJobId
                        ? 'Job updated successfully'
                        : 'Job posted successfully'
                    );

                    setTitle('');
                    setDescription('');
                    setResponsibilities('');
                    setRequiredSkills('');
                    setEducation('');
                    setExperience('');
                    setEditingJobId(null);

                    fetchJobs();
                  } else {
                    alert(data.error || 'Something went wrong');
                  }
                } catch (error) {
                  console.error(error);
                  alert('Something went wrong');
                } finally {
                  setPostingJob(false);
                }
              }}
              disabled={postingJob}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all"
            >
              {postingJob
                ? editingJobId
                  ? 'Updating...'
                  : 'Posting...'
                : editingJobId
                  ? 'Update Job'
                  : 'Post Job'}
            </button>

            {editingJobId && (
              <button
                onClick={() => {
                  setEditingJobId(null);
                  setTitle('');
                  setDescription('');
                  setResponsibilities('');
                  setRequiredSkills('');
                  setEducation('');
                  setExperience('');
                }}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Posted Jobs */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Posted Jobs
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              // <div
              //   key={job.jobId}
              //   className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              // >
              <div
                key={job.jobId}
                className={`bg-zinc-800 border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer transition-all ${selectedPosition === job.title
                  ? "border-yellow-400"
                  : "border-zinc-700"
                  }`}
                onClick={() =>
                  setSelectedPosition(job.title)
                }
              >
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {job.title}
                  </h3>

                  {/* <p className="text-gray-400 text-sm mt-1">
                    {job.experience || 'No experience added'}
                  </p> */}
                  <p className="text-gray-400 text-sm mt-1">
                    {job.experience
                      ? `Experience: ${job.experience}`
                      : 'Experience: Not specified'}
                  </p>

                  <p className="text-yellow-400 text-sm mt-2">
                    Applications: {
                      apps.filter(
                        (app) => app.position === job.title
                      ).length
                    }
                  </p>
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setEditingJobId(job.jobId);

                      setTitle(job.title || '');
                      setDescription(job.description || '');
                      setResponsibilities(job.responsibilities || '');
                      setRequiredSkills(job.requiredSkills || '');
                      setEducation(job.education || '');
                      setExperience(job.experience || '');

                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      if (!confirm(`Delete ${job.title}?`)) return;

                      try {
                        const res = await fetch('/api/jobs', {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            id: job.jobId,
                          }),
                        });

                        if (res.ok) {
                          setJobs((prev) =>
                            prev.filter((j) => j.jobId !== job.jobId)
                          );
                        } else {
                          alert('Failed to delete job');
                        }
                      } catch (error) {
                        console.error(error);
                        alert('Something went wrong');
                      }
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-medium transition-all"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPosition && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-white">
              Viewing applications for:
            </span>

            <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold">
              {selectedPosition}
            </span>

            <button
              onClick={() => setSelectedPosition('')}
              className="bg-zinc-700 px-3 py-1 rounded-lg text-white"
            >
              Show All
            </button>
          </div>
        )}
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


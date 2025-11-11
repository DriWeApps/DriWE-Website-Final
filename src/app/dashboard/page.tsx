// 'use client';
// import { useState, useMemo, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [apps, setApps] = useState<any[]>([]);
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // 🔹 Auto login check
//   useEffect(() => {
//     const admin = localStorage.getItem('isAdmin');
//     if (admin === 'true') {
//       setIsLoggedIn(true);
//       fetchApplications();
//     }
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       const res = await fetch('/api/application', { cache: 'no-store' });
//       if (!res.ok) throw new Error('Failed to fetch applications');
//       const data = await res.json();
//       setApps(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('❌ Error fetching applications:', err);
//     }
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email === 'admin@gmail.com' && password === 'Admin@123') {
//       localStorage.setItem('isAdmin', 'true');
//       setIsLoggedIn(true);
//       setError('');
//       fetchApplications();
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAdmin');
//     setIsLoggedIn(false);
//   };

//   const filtered = useMemo(() => {
//     if (!apps || apps.length === 0) return [];
//     if (!fromDate && !toDate) return apps;
//     return apps.filter((app) => {
//       const d = new Date(app.createdAt);
//       const from = fromDate ? new Date(fromDate) : null;
//       const to = toDate ? new Date(toDate) : null;
//       const after = !from || d >= from;
//       const before = !to || d <= new Date(to.setHours(23, 59, 59, 999));
//       return after && before;
//     });
//   }, [apps, fromDate, toDate]);

//   // ───────────────────────────────────────────────
//   // Login Screen
//   // ───────────────────────────────────────────────
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gray-100">
//         <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-sm border border-zinc-800">
//           <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">Admin Login</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-300 mb-1">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-300 mb-1">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <button
//               type="submit"
//               className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // ───────────────────────────────────────────────
//   // Dashboard Table
//   // ───────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-zinc-950 text-gray-100 p-6 relative">
//       <button
//         onClick={handleLogout}
//         className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-8 text-center">
//           DriWE Job Applications Dashboard
//         </h1>

//         {/* Filter Section */}
//         <div className="mb-8 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
//           <h2 className="text-lg font-semibold text-yellow-400 mb-4">
//             Filter by Application Date
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>
//           </div>
//           {(fromDate || toDate) && (
//             <button
//               onClick={() => {
//                 setFromDate('');
//                 setToDate('');
//               }}
//               className="mt-3 text-xs text-yellow-400 hover:text-yellow-300 underline"
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>

//         {/* Table Section */}
//         {filtered.length === 0 ? (
//           <p className="text-center text-gray-400 text-lg">
//             {apps.length === 0
//               ? 'No applications submitted yet.'
//               : 'No applications found in the selected date range.'}
//           </p>
//         ) : (
//           <div className="overflow-x-auto rounded-lg border border-zinc-800">
//             <table className="w-full table-auto bg-zinc-900 text-left text-sm">
//               <thead className="bg-zinc-800 text-yellow-400 uppercase tracking-wider">
//                 <tr>
//                   <th className="px-4 py-3">Name</th>
//                   <th className="px-4 py-3">Email</th>
//                   <th className="px-4 py-3">Position</th>
//                   <th className="px-4 py-3">Applied On</th>
//                   <th className="px-4 py-3">Resume</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-700">
//                 {filtered.map((app) => (
//                   <tr key={app.id} className="hover:bg-zinc-800 transition-colors duration-200">
//                     <td className="px-4 py-3 font-medium">{app.name}</td>
//                     <td className="px-4 py-3">
//                       <a href={`mailto:${app.email}`} className="text-yellow-400 hover:underline">
//                         {app.email}
//                       </a>
//                     </td>
//                     <td className="px-4 py-3">{app.position || '-'}</td>
//                     <td className="px-4 py-3">
//                       {new Date(app.createdAt).toLocaleString('en-IN', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </td>
//                     <td className="px-4 py-3">
//                       {app.resumePath ? (
//                         <Link
//                           href={app.resumePath}
//                           target="_blank"
//                           className="text-yellow-400 hover:text-yellow-300 underline"
//                         >
//                           View
//                         </Link>
//                       ) : (
//                         <span className="text-gray-500 text-xs">—</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  email: string;
  position: string | null;
  createdAt: string;
  resumePath: string | null;
}

export default function DashboardPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto login check
  useEffect(() => {
    const admin = localStorage.getItem('isAdmin');
    if (admin === 'true') {
      setIsLoggedIn(true);
      fetchApplications();
    }
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/application', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      localStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
      setError('');
      fetchApplications();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setApps([]);
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

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gray-100">
        <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-sm border border-zinc-800">
          <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          DriWE Job Applications Dashboard
        </h1>

        <div className="mb-8 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">
            Filter by Application Date
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          {(fromDate || toDate) && (
            <button
              onClick={() => {
                setFromDate('');
                setToDate('');
              }}
              className="mt-3 text-xs text-yellow-400 hover:text-yellow-300 underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            {apps.length === 0
              ? 'No applications submitted yet.'
              : 'No applications found in the selected date range.'}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full table-auto bg-zinc-900 text-left text-sm">
              <thead className="bg-zinc-800 text-yellow-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Applied On</th>
                  <th className="px-4 py-3">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-zinc-800 transition-colors duration-200">
                    <td className="px-4 py-3 font-medium">{app.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${app.email}`} className="text-yellow-400 hover:underline">
                        {app.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{app.position || '-'}</td>
                    <td className="px-4 py-3">
                      {new Date(app.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {app.resumePath ? (
                        <Link
                          href={app.resumePath}
                          target="_blank"
                          className="text-yellow-400 hover:text-yellow-300 underline"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-gray-500 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
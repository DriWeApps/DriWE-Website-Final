// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/auth/login', {
//   method: 'POST',
//   credentials: 'include', // IMPORTANT
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     email,
//     password,
//   }),
// });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || 'Login failed');
//         return;
//       }
// window.location.href = '/dashboard';
//       // router.push('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gray-100">
//       <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-sm border border-zinc-800">
//         <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
//           Admin Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();        // This is critical
    e.stopPropagation();

    setError('');
    setLoading(true);

    try {
      console.log('🚀 Login attempt started for:', email);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Response status:', res.status);

      const data = await res.json();
      console.log('📥 Response data:', data);

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      console.log('✅ Login successful - Redirecting...');
      window.location.href = '/dashboard';

    } catch (err: unknown) {
      console.error('❌ Login Error:', (err as Error).message);
      setError('Failed to connect to server. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gray-100">
      <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-sm border border-zinc-800">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-950/50 p-3 rounded border border-red-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600/50 text-black font-semibold rounded-lg transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Default: admin@gmail.com / Admin@123
        </p>
      </div>
    </div>
  );
}
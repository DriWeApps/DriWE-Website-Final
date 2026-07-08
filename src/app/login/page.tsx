
'use client';
// import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // await signIn("google", {
      //   callbackUrl: "/dashboard",
      // });

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

          {/* <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={loading}
              required
            />
          </div> */}

          <div>
  <label className="block text-sm text-gray-300 mb-1">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 pr-12 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      disabled={loading}
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
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


      </div>
    </div>
  );
}
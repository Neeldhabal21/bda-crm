import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Basic frontend authentication
    if (email === 'admin@crm.com' && password === 'admin123') {
      setError('');
      onLogin({ email });
    } else {
      setError('Invalid email or password. Use admin@crm.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          {/* Logo or Icon */}
          <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-200 mb-3">
            C
          </div>
          <h2 className="text-2xl font-bold text-slate-800">BDA CRM Portal</h2>
          <p className="text-slate-500 text-sm mt-1">Lead Management Dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., admin@crm.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl transition-all cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            For evaluation, use email <span className="font-semibold text-slate-600">admin@crm.com</span> and password <span className="font-semibold text-slate-600">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

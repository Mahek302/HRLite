import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Demo credentials
    const demoCredentials = {
      'manager@litehr.com': { password: 'manager123', role: 'manager', name: 'John Manager' },
      'admin@litehr.com': { password: 'admin123', role: 'admin', name: 'Sarah Admin' }
    };

    if (demoCredentials[email] && demoCredentials[email].password === password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email,
        name: demoCredentials[email].name,
        role: demoCredentials[email].role
      }));
      
      // Navigate to manager dashboard
      navigate('/manager/dashboard');
    } else {
      setError('Invalid email or password. Try: manager@litehr.com / manager123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl p-8 border border-[#374151]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">HR</span>
              </div>
              <span className="text-3xl font-bold tracking-wide text-white">LiteHR</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div className="bg-[rgba(139,92,246,0.1)] border border-[#8B5CF6] rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#8B5CF6] mb-2">Demo Credentials:</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Manager: manager@litehr.com / manager123</li>
                <li>• Admin: admin@litehr.com / admin123</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#10B981] hover:from-[#7C3AED] hover:to-[#059669] text-white font-semibold py-3 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-[#8B5CF6] hover:text-[#7C3AED]"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
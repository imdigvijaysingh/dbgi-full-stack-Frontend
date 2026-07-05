import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import GlobalLoader from '../../components/common/GlobalLoader';

const AdminLogin = () => {
  const [username, setUsername] = useState(import.meta.env.DEV ? 'admin@dbgi.in' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'admin123' : '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email: username, password });
      
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('cms_token', res.data.token);
      localStorage.setItem('adminUsername', res.data.user.username);
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Portal Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fe0b00] focus:border-[#fe0b00]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fe0b00] focus:border-[#fe0b00]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#fe0b00] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fe0b00]"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          <a href="/" className="text-[#fe0b00] hover:text-red-700">
            &larr; Back to Website
          </a>
        </p>
      </div>
      {isLoading && <GlobalLoader message="Logging in..." />}
    </div>
  );
};

export default AdminLogin;

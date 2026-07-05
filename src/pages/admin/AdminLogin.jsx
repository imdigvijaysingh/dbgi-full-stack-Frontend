import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import GlobalLoader from '../../components/common/GlobalLoader';
import RedirectOverlay from '../../components/common/RedirectOverlay';
import Toast from '../../components/common/Toast';

const AdminLogin = () => {
  const [username, setUsername] = useState(import.meta.env.DEV ? 'admin@dbgi.in' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'admin123' : '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showToast = (message, type = 'success') => setToast({ message, type });

  React.useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage, location.state.toastType || 'success');
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleBackToWebsite = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email: username, password });
      
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('cms_token', res.data.token);
      localStorage.setItem('adminUsername', res.data.user.username);
      
      setTimeout(() => {
        navigate('/admin/dashboard', { state: { toastMessage: 'Login successful!', toastType: 'success' } });
      }, 1500);
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
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fe0b00] focus:border-[#fe0b00]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#fe0b00]"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
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
          <button onClick={handleBackToWebsite} className="text-[#fe0b00] hover:text-red-700 bg-transparent border-none cursor-pointer">
            &larr; Back to Website
          </button>
        </p>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      {isLoading && <GlobalLoader message="Logging in..." />}
      {isRedirecting && <RedirectOverlay />}
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../../components/common/Toast';
import GlobalLoader from '../../components/common/GlobalLoader';
import RedirectOverlay from '../../components/common/RedirectOverlay';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState(import.meta.env.DEV ? 'ds123' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'pass123' : '');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleBackToWebsite = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/v1/students/login', { studentId, password });
      localStorage.setItem('studentToken', data.token);
      showToast('Login Successful', 'success');
      setTimeout(() => navigate('/erp/dashboard'), 1500);
    } catch (error) {
      showToast(error.response?.data?.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <i className="fas fa-user-graduate text-5xl text-blue-600 mb-4"></i>
          <h2 className="text-3xl font-extrabold text-gray-900">Student Portal Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your academic records and profile
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Student ID / Roll No</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-id-card text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="e.g. CS2022001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Logging in...' : 'Sign in to Portal'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm space-y-2">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/erp/signup" className="text-blue-600 hover:text-blue-800 transition font-medium">
                  Sign up here
                </Link>
              </p>
              <button onClick={handleBackToWebsite} className="text-blue-600 hover:text-blue-800 transition inline-block mt-2 bg-transparent border-none cursor-pointer">
                <i className="fas fa-arrow-left mr-1"></i> Back to Main Website
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {loading && <GlobalLoader message="Logging in..." />}
      {isRedirecting && <RedirectOverlay />}
    </div>
  );
};

export default StudentLogin;

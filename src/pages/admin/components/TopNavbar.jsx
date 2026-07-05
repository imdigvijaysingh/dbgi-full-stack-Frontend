import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlobalLoader from '../../../components/common/GlobalLoader';
import RedirectOverlay from '../../../components/common/RedirectOverlay';
import api from '../../../utils/api';

const TopNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin User';

  useEffect(() => {
    // Unused
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('cms_token');
      navigate('/admin/login', { state: { toastMessage: 'Logged out successfully', toastType: 'success' } });
      setIsLoading(false);
    }, 1500); // Wait for overlay
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-[1000] shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        
        {/* Global Search Mockup */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-[#fe0b00] transition-shadow">
          <i className="fas fa-search text-gray-400 mr-2"></i>
          <input 
            type="text" 
            placeholder="Search pages, users, media..." 
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">

        <div className="relative">
          <button 
            onClick={() => {
              setProfileOpen(!profileOpen);
            }}
            className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-[#fe0b00] text-white rounded-full flex items-center justify-center font-bold">
              {adminUsername.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">{adminUsername}</span>
            <i className="fas fa-chevron-down text-xs text-gray-400"></i>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-[1010]" onClick={() => setProfileOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-[1020] animate-[modalFadeIn_0.2s_ease]">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-sm font-medium text-gray-800">{adminUsername}</p>
                  <p className="text-xs text-gray-500 truncate">admin@dbgisre.edu.in</p>
                </div>
                <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Settings</Link>
                <Link to="/admin/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help & Support</Link>
                <div className="border-t border-gray-100 mt-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoading && <RedirectOverlay message="Logging out..." />}
    </header>
  );
};

export default TopNavbar;

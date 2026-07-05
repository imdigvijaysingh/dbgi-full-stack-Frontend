import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Toast from '../../../components/common/Toast';
import GlobalLoader from '../../../components/common/GlobalLoader';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  useEffect(() => {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => setToast(null);

  const showLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsGlobalLoading(true);
  };

  const hideLoading = () => {
    setIsGlobalLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8 relative">
          {/* Outlet context passes the showToast function to all child routes */}
          <Outlet context={{ showToast, showLoading, hideLoading }} />
        </main>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
      
      {isGlobalLoading && <GlobalLoader message={loadingMessage} />}
    </div>
  );
};

export default AdminLayout;

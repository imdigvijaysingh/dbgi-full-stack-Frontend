import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import RedirectOverlay from '../../../components/common/RedirectOverlay';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const handleBackToWebsite = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'fa-table-columns' },
    { name: 'Classes', path: '/admin/classes', icon: 'fa-graduation-cap' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: 'fa-comments' },
    { name: 'Affiliations', path: '/admin/affiliations', icon: 'fa-award' },
    { name: 'Students (ERP)', path: '/admin/students', icon: 'fa-user-graduate' },
    { name: 'ERP Notifications', path: '/admin/erp-notifications', icon: 'fa-bell' },
    { name: 'ERP Assignments', path: '/admin/erp-assignments', icon: 'fa-tasks' },
    { name: 'ERP Study Material', path: '/admin/erp-study-materials', icon: 'fa-book-open' },
    { name: 'ERP Attendance', path: '/admin/erp-attendance', icon: 'fa-clipboard-user' },
    { name: 'Notice Board', path: '/admin/notices', icon: 'fa-bullhorn' },
    { name: 'Media Library', path: '/admin/media', icon: 'fa-images' },
    { name: 'Users', path: '/admin/users', icon: 'fa-users' },
    { name: 'My Profile', path: '/admin/profile', icon: 'fa-user' },
    { name: 'Help & Support', path: '/admin/help', icon: 'fa-circle-question' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[2000] md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r shadow-sm z-[2010] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-gray-800 tracking-tight">DBGI <span className="text-[#fe0b00]">CMS</span></span>
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={toggleSidebar}>
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ml-2">Main Menu</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#fe0b00]/10 text-[#fe0b00] font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
              >
                <i className={`fas ${item.icon} w-5 text-center text-lg`}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <button onClick={handleBackToWebsite} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full text-left">
            <i className="fas fa-external-link-alt w-5 text-center"></i>
            <span>View Live Site</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      
      {isRedirecting && <RedirectOverlay />}
    </>
  );
};

export default Sidebar;

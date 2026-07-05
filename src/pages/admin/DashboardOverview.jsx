import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    testimonials: 0,
    notices: 0,
    media: 0,
    totalUsers: 0,
  });
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [noticesRes, testimonialsRes, mediaRes, activitiesRes, usersRes, studentsRes] = await Promise.all([
        api.get('/notices'),
        api.get('/testimonials'),
        api.get('/media'),
        api.get('/activities'),
        api.get('/auth/users/count'),
        api.get('/students')
      ]);

      const adminsCount = usersRes.data.count || 0;
      const studentsCount = studentsRes.data.length || 0;

      setStats({
        notices: noticesRes.data.count || 0,
        testimonials: testimonialsRes.data.count || 0,
        media: mediaRes.data.count || 0,
        totalUsers: adminsCount + studentsCount
      });

      setActivities(activitiesRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins || 1} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return `Yesterday at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mr-4">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-xl mr-4">
            <i className="fas fa-comments"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Custom Testimonials</p>
            <p className="text-2xl font-bold text-gray-900">{stats.testimonials}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xl mr-4">
            <i className="fas fa-bullhorn"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Notices</p>
            <p className="text-2xl font-bold text-gray-900">{stats.notices}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center text-xl mr-4">
            <i className="fas fa-images"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Media Items</p>
            <p className="text-2xl font-bold text-gray-900">{stats.media}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/notices" className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
              <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center mr-3 group-hover:bg-[#fe0b00] group-hover:text-white transition-colors">
                <i className="fas fa-plus text-sm"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Add New Notice</span>
            </Link>
            <Link to="/admin/testimonials" className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
              <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center mr-3 group-hover:bg-[#fe0b00] group-hover:text-white transition-colors">
                <i className="fas fa-plus text-sm"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Add Testimonial</span>
            </Link>
            <Link to="/admin/media" className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
              <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center mr-3 group-hover:bg-[#fe0b00] group-hover:text-white transition-colors">
                <i className="fas fa-upload text-sm"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Upload Media</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity Mockup */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <i className="fas fa-circle-notch fa-spin text-2xl text-[#fe0b00]"></i>
              </div>
            ) : activities.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No recent activity found.</p>
            ) : (
              activities.map((activity, index) => {
                const isLast = index === activities.length - 1;
                let colorClass = 'bg-blue-500';
                if (activity.action === 'Added' || activity.action === 'Logged In') colorClass = 'bg-green-500';
                if (activity.action === 'Deleted') colorClass = 'bg-red-500';
                if (activity.action === 'Updated') colorClass = 'bg-orange-500';

                return (
                  <div key={activity._id} className="flex gap-4">
                    <div className="relative mt-1">
                      <div className={`w-2 h-2 ${colorClass} rounded-full z-10 relative`}></div>
                      {!isLast && <div className="absolute top-2 left-1/2 -ml-px w-px h-full bg-gray-200"></div>}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action.toLowerCase()} {activity.entity.toLowerCase()} <span className="font-medium text-[#fe0b00]">{activity.details}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(activity.createdAt)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

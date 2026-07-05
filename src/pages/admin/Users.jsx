import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';

const Users = () => {
  const { showToast } = useOutletContext();
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch current user details
    const fetchMe = async () => {
      try {
        const res = await api.get('/auth/me');
        setFormData((prev) => ({ ...prev, username: res.data.data.username }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { username: formData.username };
      if (formData.currentPassword && formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const res = await api.put('/auth/updatedetails', payload);
      
      // Update token and username in localstorage
      localStorage.setItem('cms_token', res.data.token);
      localStorage.setItem('adminUsername', res.data.user.username);
      
      setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
      showToast('Credentials updated successfully!');
    } catch (error) {
      showToast(error.response?.data?.error || 'Failed to update credentials', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Update Admin Credentials</h1>
          <p className="text-gray-500 text-sm">Change your username or password here.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Leave blank if not changing"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Leave blank if not changing"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#fe0b00] text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? <i className="fas fa-circle-notch fa-spin"></i> : 'Update Credentials'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;

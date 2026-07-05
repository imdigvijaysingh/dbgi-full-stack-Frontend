import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ErpNotificationsManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetType: 'all',
    targetId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      showToast('Title and Message are required', 'error');
      return;
    }
    if (formData.targetType !== 'all' && !formData.targetId) {
      showToast('Target ID/Class Name is required for this target type', 'error');
      return;
    }

    try {
      showLoading('Sending Notification...');
      const token = localStorage.getItem('cms_token');
      await axios.post('/api/v1/notifications', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Notification sent successfully');
      setFormData({ title: '', message: '', targetType: 'all', targetId: '' });
    } catch (error) {
      showToast('Failed to send notification', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6"><i className="fas fa-bell text-blue-500 mr-2"></i> Send Notification</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Notification Title" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Message content..." required></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <select name="targetType" value={formData.targetType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="all">All Students</option>
            <option value="class">Specific Class (e.g. B.Tech CSE - 6th Sem)</option>
            <option value="student">Specific Student (Student ID)</option>
          </select>
        </div>

        {formData.targetType !== 'all' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.targetType === 'class' ? 'Class Name' : 'Student ID'}
            </label>
            <input type="text" name="targetId" value={formData.targetId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder={`Enter ${formData.targetType === 'class' ? 'Class Name' : 'Student ID'}`} required />
          </div>
        )}

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
          <i className="fas fa-paper-plane mr-2"></i> Send Notification
        </button>
      </form>
    </div>
  );
};

export default ErpNotificationsManager;

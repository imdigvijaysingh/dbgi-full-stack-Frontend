import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import ConfirmModal from './components/ConfirmModal';

const NoticesManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [notices, setNotices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ title: '', description: '', link: '', buttonText: '' });

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices/all');
      setNotices(res.data.data);
    } catch (error) {
      showToast('Failed to load notices', 'error');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading('Publishing Notice...');
    
    try {
      await api.post('/notices', formData);
      setFormData({ title: '', description: '', link: '', buttonText: '' });
      fetchNotices();
      showToast('Notice published successfully!');
    } catch (error) {
      showToast('Failed to publish notice', 'error');
    } finally {
      hideLoading();
    }
  };

  const confirmDelete = (id) => {
    setDeleteIndex(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    setIsModalOpen(false);
    showLoading('Deleting Notice...');
    try {
      await api.delete(`/notices/${deleteIndex}`);
      fetchNotices();
      showToast('Notice deleted.', 'info');
    } catch (error) {
      showToast('Failed to delete notice', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Notice Board</h1>
        <p className="text-gray-500 text-sm">Manage important announcements displayed at the top of the homepage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. End Semester Exams"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea
                  placeholder="Brief details about the notice..."
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Link</label>
                  <input
                    type="text"
                    placeholder="e.g. /admissions"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow text-sm"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Read More"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow text-sm"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#fe0b00] text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors flex justify-center items-center"
              >
                Publish Notice
              </button>
            </form>
          </div>
        </div>

        {/* Data List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Active Notices</h2>
              <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-semibold">{notices.length} total</span>
            </div>
            
            {notices.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <i className="fas fa-bullhorn text-4xl mb-3 text-gray-300"></i>
                <p>No active notices on the board.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notices.map((n, idx) => (
                  <li key={idx} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{n.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{n.description}</p>
                        {(n.link || n.buttonText) && (
                          <div className="flex items-center gap-2 text-xs bg-gray-100 inline-flex px-2 py-1 rounded border border-gray-200">
                            <i className="fas fa-link text-gray-400"></i>
                            <span className="font-medium text-gray-700">{n.buttonText || 'Link'}</span>
                            <span className="text-gray-400">&rarr;</span>
                            <span className="text-blue-600 truncate max-w-[200px]">{n.link}</span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => confirmDelete(n._id)}
                        className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Remove Notice"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Remove Notice"
        message="Are you sure you want to remove this notice from the board? This action cannot be undone."
      />
    </div>
  );
};

export default NoticesManager;

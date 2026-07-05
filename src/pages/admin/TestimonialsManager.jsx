import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import ConfirmModal from './components/ConfirmModal';

const TestimonialsManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ content: '', author: '', role: '' });

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials/all');
      setTestimonials(res.data.data);
    } catch (error) {
      showToast('Failed to load testimonials', 'error');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading('Publishing Testimonial...');
    
    try {
      await api.post('/testimonials', formData);
      setFormData({ content: '', author: '', role: '' });
      fetchTestimonials();
      showToast('Testimonial added successfully!');
    } catch (error) {
      showToast('Failed to add testimonial', 'error');
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
    showLoading('Deleting Testimonial...');
    try {
      await api.delete(`/testimonials/${deleteIndex}`);
      fetchTestimonials();
      showToast('Testimonial deleted.', 'info');
    } catch (error) {
      showToast('Failed to delete testimonial', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Testimonials</h1>
          <p className="text-gray-500 text-sm">Manage student and alumni testimonials displayed on the homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add New</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role/Course <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech CSE, 2024"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote <span className="text-red-500">*</span></label>
                <textarea
                  placeholder="Write the testimonial content here..."
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-shadow h-28 resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#fe0b00] text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors flex justify-center items-center"
              >
                Publish Testimonial
              </button>
            </form>
          </div>
        </div>

        {/* Data List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Published Testimonials</h2>
              <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-semibold">{testimonials.length} total</span>
            </div>
            
            {testimonials.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <i className="fas fa-comment-slash text-4xl mb-3 text-gray-300"></i>
                <p>No custom testimonials found.</p>
                <p className="text-sm">Use the form to add one.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {testimonials.map((t, idx) => (
                  <li key={idx} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-md font-bold text-gray-900">{t.author}</h4>
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t.role}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{t.content}"</p>
                      </div>
                      <button 
                        onClick={() => confirmDelete(t._id)}
                        className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Delete"
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
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
};

export default TestimonialsManager;

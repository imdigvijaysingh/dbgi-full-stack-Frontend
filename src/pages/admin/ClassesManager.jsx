import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';

const ClassesManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    semester: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/classes');
      if (res.data.success) {
        setClasses(res.data.data);
      }
    } catch (error) {
      showToast('Failed to fetch classes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (cls = null) => {
    if (cls) {
      setEditingId(cls._id);
      setFormData({
        courseName: cls.courseName,
        semester: cls.semester,
        isActive: cls.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        courseName: '',
        semester: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading(editingId ? 'Updating class...' : 'Creating class...');
    try {
      if (editingId) {
        await api.put(`/classes/${editingId}`, formData);
        showToast('Class updated successfully');
      } else {
        await api.post('/classes', formData);
        showToast('Class created successfully');
      }
      handleCloseModal();
      fetchClasses();
    } catch (error) {
      showToast(error.response?.data?.error || 'Operation failed', 'error');
    } finally {
      hideLoading();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      showLoading('Deleting class...');
      try {
        await api.delete(`/classes/${id}`);
        showToast('Class deleted successfully');
        fetchClasses();
      } catch (error) {
        showToast('Failed to delete class', 'error');
      } finally {
        hideLoading();
      }
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Classes Manager</h1>
          <p className="text-gray-500 text-sm">Create and manage classes used across the ERP modules.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#fe0b00] text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow"
        >
          <i className="fas fa-plus"></i> Add New Class
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <i className="fas fa-circle-notch fa-spin text-2xl mb-2"></i>
            <p>Loading classes...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-red-50 text-[#fe0b00] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Classes Found</h3>
            <p className="text-gray-500 mb-4">You haven't added any classes yet.</p>
            <button 
              onClick={() => handleOpenModal()}
              className="text-[#fe0b00] font-medium hover:underline"
            >
              Add your first class
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600 text-sm">Course Name</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Semester / Year</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.map((cls) => (
                  <tr key={cls._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{cls.courseName}</div>
                    </td>
                    <td className="p-4 text-gray-600">{cls.semester}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cls.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {cls.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleOpenModal(cls)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(cls._id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[modalFadeIn_0.3s_ease]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-[modalSlideUp_0.3s_ease]">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Class' : 'Add New Class'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 sm:p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none"
                    placeholder="e.g. B.Tech CSE"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester / Year *</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none"
                    placeholder="e.g. 6th Sem"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#fe0b00] rounded focus:ring-[#fe0b00]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Active Class
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white bg-[#fe0b00] hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-save"></i>
                  {editingId ? 'Update Class' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesManager;

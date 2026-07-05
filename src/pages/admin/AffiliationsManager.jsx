import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import ConfirmModal from './components/ConfirmModal';

const AffiliationsManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [affiliations, setAffiliations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAffiliations();
  }, []);

  const fetchAffiliations = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/affiliations/all');
      setAffiliations(res.data.data);
    } catch (error) {
      showToast(error.response?.data?.error || 'Failed to fetch affiliations', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openModal = (affiliation = null) => {
    if (affiliation) {
      setFormData({
        title: affiliation.title,
        description: affiliation.description,
        isActive: affiliation.isActive
      });
      setEditingId(affiliation._id);
    } else {
      setFormData({
        title: '',
        description: '',
        isActive: true
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading(editingId ? 'Updating Affiliation...' : 'Adding Affiliation...');
    try {
      if (editingId) {
        await api.put(`/affiliations/${editingId}`, formData);
        showToast('Affiliation updated successfully', 'success');
      } else {
        await api.post('/affiliations', formData);
        showToast('Affiliation created successfully', 'success');
      }
      closeModal();
      fetchAffiliations();
    } catch (error) {
      showToast(error.response?.data?.error || 'Operation failed', 'error');
    } finally {
      hideLoading();
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    showLoading('Deleting Affiliation...');
    try {
      await api.delete(`/affiliations/${deleteModal.id}`);
      showToast('Affiliation deleted successfully', 'success');
      fetchAffiliations();
    } catch (error) {
      showToast(error.response?.data?.error || 'Failed to delete affiliation', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: null });
      hideLoading();
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    showLoading('Updating Status...');
    try {
      await api.put(`/affiliations/${id}`, { isActive: !currentStatus });
      showToast('Status updated successfully', 'success');
      fetchAffiliations();
    } catch (error) {
      showToast('Failed to update status', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Affiliations Manager</h1>
          <p className="text-gray-500 text-sm">Manage accreditations and recognitions displayed on the About Us page.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#fe0b00] text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <i className="fas fa-plus text-sm"></i>
          Add Affiliation
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <i className="fas fa-circle-notch fa-spin text-3xl text-[#fe0b00]"></i>
          </div>
        ) : affiliations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-award text-2xl text-gray-400"></i>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">No affiliations found</p>
            <p className="text-sm">Click the button above to create your first affiliation.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4 hidden sm:table-cell">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {affiliations.map((affiliation) => (
                  <tr key={affiliation._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-medium text-gray-900">
                      {affiliation.title}
                    </td>
                    <td className="p-4 text-sm text-gray-500 hidden sm:table-cell max-w-[300px] truncate">
                      {affiliation.description}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(affiliation._id, affiliation.isActive)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          affiliation.isActive 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {affiliation.isActive ? (
                          <><i className="fas fa-check-circle mr-1.5"></i> Active</>
                        ) : (
                          <><i className="fas fa-times-circle mr-1.5"></i> Inactive</>
                        )}
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button 
                        onClick={() => openModal(affiliation)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => confirmDelete(affiliation._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-[modalFadeIn_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Affiliation' : 'Add New Affiliation'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title (e.g., AICTE, PCI) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#fe0b00] focus:ring-2 focus:ring-[#fe0b00]/20 outline-none transition-all text-sm"
                    placeholder="Enter affiliation title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#fe0b00] focus:ring-2 focus:ring-[#fe0b00]/20 outline-none transition-all text-sm resize-none"
                    placeholder="Enter full description (e.g., All India Council for Technical Education)"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#fe0b00] border-gray-300 rounded focus:ring-[#fe0b00]"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Publish immediately (Active)
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#fe0b00] rounded-lg hover:bg-red-700 transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Create Affiliation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Affiliation"
        message="Are you sure you want to delete this affiliation? This action cannot be undone."
      />
    </div>
  );
};

export default AffiliationsManager;

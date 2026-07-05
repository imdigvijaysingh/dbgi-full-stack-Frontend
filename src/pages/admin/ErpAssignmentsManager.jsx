import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import DragDropUpload from '../../components/common/DragDropUpload';

const ErpAssignmentsManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    targetClass: ''
  });
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('cms_token');
        const { data } = await axios.get('/api/v1/classes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClassesList(data.data.filter(c => c.isActive));
      } catch (error) {
        console.error('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.fileUrl || !formData.targetClass) {
      showToast('Title, File URL, and Target Class are required', 'error');
      return;
    }

    try {
      showLoading('Uploading Assignment...');
      const token = localStorage.getItem('cms_token');
      await axios.post('/api/v1/assignments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Assignment uploaded successfully');
      setFormData({ title: '', description: '', fileUrl: '', targetClass: '' });
    } catch (error) {
      showToast('Failed to upload assignment', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6"><i className="fas fa-tasks text-purple-500 mr-2"></i> Upload Assignment</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. Data Structures Assignment 1" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Instructions..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assignment File (PDF)</label>
          <DragDropUpload 
            accept="application/pdf"
            label="Drag & drop assignment PDF here"
            onUploadSuccess={(url) => setFormData({ ...formData, fileUrl: url })}
          />
          {formData.fileUrl && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
              <i className="fas fa-check-circle"></i>
              <span className="truncate">File ready: {formData.fileUrl.split('/').pop()}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
          <select
            name="targetClass"
            value={formData.targetClass}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
          >
            <option value="">Select a class...</option>
            {classesList.map(c => (
              <option key={c._id} value={`${c.courseName} - ${c.semester}`}>
                {c.courseName} - {c.semester}
              </option>
            ))}
          </select>
          {(!classesList || classesList.length === 0) && (
            <p className="text-xs text-red-500 mt-1">No active classes found. Please add them in the Classes Manager.</p>
          )}
        </div>

        <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
          <i className="fas fa-upload mr-2"></i> Upload Assignment
        </button>
      </form>
    </div>
  );
};

export default ErpAssignmentsManager;

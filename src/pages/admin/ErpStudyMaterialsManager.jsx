import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import DragDropUpload from '../../components/common/DragDropUpload';

const ErpStudyMaterialsManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf',
    url: '',
    targetClass: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url || !formData.targetClass) {
      showToast('Title, URL, and Target Class are required', 'error');
      return;
    }

    try {
      showLoading('Uploading Material...');
      const token = localStorage.getItem('cms_token');
      await axios.post('/api/v1/study-materials', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Study Material uploaded successfully');
      setFormData({ title: '', description: '', type: 'pdf', url: '', targetClass: '' });
    } catch (error) {
      showToast('Failed to upload material', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6"><i className="fas fa-book-open text-green-500 mr-2"></i> Upload Study Material</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Chapter 1 Notes" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Details about this material..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
            <option value="pdf">PDF Document</option>
            <option value="video">Direct Video Link (MP4)</option>
            <option value="youtube">YouTube Video</option>
          </select>
        </div>

        {formData.type !== 'youtube' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Material</label>
            <DragDropUpload 
              accept={formData.type === 'pdf' ? "application/pdf" : "video/*"}
              label={`Drag & drop ${formData.type === 'pdf' ? 'PDF' : 'Video'} file here`}
              onUploadSuccess={(url) => setFormData({ ...formData, url })}
            />
            {formData.url && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                <i className="fas fa-check-circle"></i>
                <span className="truncate">File ready: {formData.url.split('/').pop()}</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input type="text" name="url" value={formData.url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://youtube.com/watch?v=..." required />
            <p className="text-xs text-gray-500 mt-1">YouTube thumbnail will be generated automatically.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
          <input type="text" name="targetClass" value={formData.targetClass} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. B.Tech CSE - 6th Sem" required />
        </div>

        <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
          <i className="fas fa-upload mr-2"></i> Upload Material
        </button>
      </form>
    </div>
  );
};

export default ErpStudyMaterialsManager;

import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import ConfirmModal from './components/ConfirmModal';

const MediaLibrary = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Upload States
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('');
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Bulk Selection States
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      if (res.data.success) {
        setMedia(res.data.data);
      }
    } catch (error) {
      showToast('Failed to load media library', 'error');
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isMedia = file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf';
      if (!isMedia) showToast(`File ${file.name} is not a valid media type`, 'error');
      return isMedia;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      const newPreviews = validFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return showToast('Please select files to upload', 'error');

    showLoading('Uploading Media...');
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('media', file);
    });
    if (uploadCategory.trim()) {
      formData.append('category', uploadCategory.trim());
    }

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        showToast('Media uploaded successfully!', 'success');
        setSelectedFiles([]);
        setUploadCategory('');
        setPreviews(prev => {
          prev.forEach(p => URL.revokeObjectURL(p.url));
          return [];
        });
        await fetchMedia();
      }
    } catch (error) {
      showToast(error.response?.data?.error || 'Failed to upload media', 'error');
    } finally {
      hideLoading();
    }
  };

  const toggleSelectMedia = (id) => {
    setSelectedMediaIds(prev => 
      prev.includes(id) ? prev.filter(mediaId => mediaId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedMediaIds.length === 0) return;
    
    setIsModalOpen(false);
    showLoading('Deleting Media...');
    try {
      const res = await api.post('/media/delete-bulk', { ids: selectedMediaIds });
      if (res.data.success) {
        showToast(`${res.data.count} items deleted successfully`, 'success');
        setSelectedMediaIds([]);
        await fetchMedia();
      }
    } catch (error) {
      showToast('Failed to delete media', 'error');
    } finally {
      hideLoading();
    }
  };

  const handleUpdateCategory = async (id, newCategory) => {
    try {
      const res = await api.put(`/media/${id}`, { category: newCategory });
      if (res.data.success) {
        showToast('Category updated', 'success');
        fetchMedia();
      }
    } catch (error) {
      showToast('Failed to update category', 'error');
    }
  };

  return (
    <div className="animate-[modalFadeIn_0.3s_ease]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Media Library</h1>
          <p className="text-gray-500 text-sm">Upload images and videos via Drag & Drop. Bulk selection supported.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Media</h2>
            
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-[#fe0b00] bg-red-50' : 'border-gray-300 bg-gray-50/50 hover:border-[#fe0b00]'}`}
            >
              <i className={`fas fa-cloud-upload-alt text-3xl mb-2 transition-colors ${isDragging ? 'text-[#fe0b00]' : 'text-gray-400'}`}></i>
              <p className="text-sm font-medium text-gray-700">Drag & Drop files here</p>
              <p className="text-xs text-gray-500 mt-1">or click to browse</p>
              <input 
                type="file" 
                multiple 
                accept="image/*,video/*,application/pdf"
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="mt-4 max-h-64 overflow-y-auto pr-1 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Selected Files ({previews.length})</p>
                {previews.map((preview, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100 group relative">
                    {preview.type.startsWith('video/') ? (
                      <video src={preview.url} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <img src={preview.url} alt="preview" className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{preview.name}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSelectedFile(idx); }}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Category Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Category (Optional)</label>
              <input 
                type="text" 
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fe0b00] focus:ring-1 focus:ring-[#fe0b00] text-sm"
                placeholder="e.g. Freshers Party 2024"
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={selectedFiles.length === 0}
              className="w-full bg-[#fe0b00] text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex justify-center items-center mt-4"
            >
              Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
              <h2 className="text-lg font-bold text-gray-900">Gallery Items</h2>
              
              <div className="flex items-center gap-3">
                {selectedMediaIds.length > 0 && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-red-100"
                  >
                    <i className="fas fa-trash-alt"></i> Delete Selected ({selectedMediaIds.length})
                  </button>
                )}
                <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-semibold">{media.length} items</span>
              </div>
            </div>
            
            {media.length === 0 ? (
              <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
                  <i className="fas fa-image text-3xl text-gray-300"></i>
                </div>
                <p className="text-lg font-medium text-gray-700">Media Library is Empty</p>
                <p className="text-sm mt-1">Drag & Drop images or videos to upload them to the server.</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {media.map((m) => {
                    const isSelected = selectedMediaIds.includes(m._id);
                    return (
                      <div 
                        key={m._id} 
                        onClick={() => toggleSelectMedia(m._id)}
                        className={`relative group rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-50 cursor-pointer transition-all ${isSelected ? 'ring-4 ring-[#fe0b00] ring-offset-2' : 'border border-gray-200 hover:border-[#fe0b00]'}`}
                      >
                        {m.mimetype && m.mimetype.startsWith('video/') ? (
                          <video 
                            src={m.url} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <img 
                            src={m.url} 
                            alt={m.filename} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        
                        {/* Selection Checkbox */}
                        <div className={`absolute top-2 left-2 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-[#fe0b00] border-[#fe0b00]' : 'border-white bg-black/20 group-hover:bg-black/40'}`}>
                          {isSelected && <i className="fas fa-check text-white text-xs"></i>}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white text-xs truncate mb-2">{m.filename}</p>
                          <select 
                            value={m.category || 'general'} 
                            onChange={(e) => handleUpdateCategory(m._id, e.target.value)}
                            className="w-full text-xs p-1.5 border rounded outline-none cursor-pointer text-gray-800 bg-white mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="general">General</option>
                            <option value="home_featured">Home Page Featured</option>
                            <optgroup label="Campus Life">
                              <option value="sports">Sports Meet</option>
                              <option value="alumni">Alumni Meetups</option>
                              <option value="fresher">Freshers Party</option>
                              <option value="industry_visit">Industrial Visits</option>
                              <option value="tvaran">Tvaran Events</option>
                              <option value="job">Job Fair</option>
                              <option value="trip">Educational Trips</option>
                              <option value="girl_game">Girls Competition</option>
                              <option value="play">Nukkad Natak</option>
                              <option value="star_night">Star Night</option>
                              <option value="women_empower">Women Empowerment</option>
                              <option value="farewell">Farewell Party</option>
                              <option value="winners">Achievers</option>
                              <option value="guest_visit">Guest Lectures</option>
                              <option value="jagrukta">Awareness Programs</option>
                              <option value="seminar">Seminars & Workshops</option>
                              <option value="supportive_faculty">Supportive Faculty</option>
                              <option value="yoga">Yoga & Wellness</option>
                              <option value="lovely_faculty">Lovely Faculty</option>
                              <option value="parents_felicitation">Parents Felicitation</option>
                              <option value="moot_court">Moot Court</option>
                            </optgroup>
                          </select>
                          <a 
                            href={m.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/20 hover:bg-white/30 text-white p-1.5 text-sm rounded-lg flex justify-center items-center transition-colors backdrop-blur-sm"
                            title="View full media"
                          >
                            <i className="fas fa-external-link-alt text-xs mr-2"></i> Open
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Media"
        message={`Are you sure you want to delete ${selectedMediaIds.length} item(s)? This action cannot be undone.`}
      />
    </div>
  );
};

export default MediaLibrary;

import React, { useState, useRef } from 'react';
import api from '../../utils/api';
import { useOutletContext } from 'react-router-dom';

const DragDropUpload = ({ 
  onUploadSuccess, 
  accept = "image/*,video/*,application/pdf", 
  label = "Drag & drop file here or click to browse",
  uploadUrl = "/media/upload"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const context = useOutletContext();
  const showToast = context?.showToast || ((msg) => console.log(msg));

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('media', file);

    try {
      // CMS uses api.post with the token attached automatically
      const res = await api.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success && res.data.data.length > 0) {
        showToast('File uploaded successfully!', 'success');
        onUploadSuccess(res.data.data[0].url);
      }
    } catch (error) {
      showToast(error.response?.data?.error || 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer 
        ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:bg-gray-50 bg-white'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept={accept}
        className="hidden" 
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
          <p className="text-gray-600 font-medium">Uploading...</p>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-cloud-upload-alt text-2xl"></i>
          </div>
          <p className="text-gray-800 font-semibold mb-1">{label}</p>
          <p className="text-xs text-gray-500">Supports PDF, Image, Video</p>
        </>
      )}
    </div>
  );
};

export default DragDropUpload;

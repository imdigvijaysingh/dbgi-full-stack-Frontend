import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Toast from './Toast';

const AdmissionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAdmissionModal', handleOpen);
    return () => window.removeEventListener('openAdmissionModal', handleOpen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.course) {
      setToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      // Users should replace these with their actual EmailJS credentials in a production environment
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email || 'Not provided',
        phone_number: formData.phone,
        course_interested: formData.course,
      };

      // If keys aren't provided, simulate success (good for demo purposes until configured)
      if (serviceId === 'YOUR_SERVICE_ID') {
        console.log('Simulating EmailJS send:', templateParams);
        setTimeout(() => {
          setLoading(false);
          setToast({ message: 'Application submitted successfully! We will contact you soon.', type: 'success' });
          setTimeout(() => {
            setIsOpen(false);
            setFormData({ name: '', email: '', phone: '', course: '' });
          }, 2000);
        }, 1500);
        return;
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setLoading(false);
      setToast({ message: 'Application submitted successfully! We will contact you soon.', type: 'success' });
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: '', email: '', phone: '', course: '' });
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      setToast({ message: 'Failed to send application. Please try again.', type: 'error' });
      console.error('EmailJS Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/70 flex items-center justify-center p-4 overflow-y-auto animate-[modalFadeIn_0.3s_ease]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all animate-[modalSlideUp_0.4s_ease]">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
        
        <div className="bg-gradient-to-r from-[#fe0b00] to-red-700 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Apply for Admission</h2>
          <p className="text-red-100 text-sm">Take the first step toward your future. Fill out the form below and we'll get in touch!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-all shadow-sm"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-all shadow-sm"
              placeholder="+91 9876543210"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span></label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-all shadow-sm"
              placeholder="johndoe@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course Interested In <span className="text-red-500">*</span></label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe0b00] focus:border-[#fe0b00] outline-none transition-all shadow-sm bg-white"
              required
            >
              <option value="">Select a course...</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
              <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
              <option value="B.Pharm">B.Pharm</option>
              <option value="D.Pharm">D.Pharm</option>
              <option value="Polytechnic Diploma">Polytechnic Diploma</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 px-4 bg-gradient-to-r from-[#fe0b00] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 mt-8 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Submitting...</>
            ) : (
              <>Submit Application <i className="fas fa-paper-plane ml-1"></i></>
            )}
          </button>
        </form>
      </div>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default AdmissionModal;

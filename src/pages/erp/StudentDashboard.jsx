import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../../components/common/Toast';
import ProfileImageCropper from '../../components/ProfileImageCropper';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [notifications, setNotifications] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);

  // Tab & layout state
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);
  
  const [toast, setToast] = useState(null);
  
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          navigate('/erp/login');
          return;
        }

        const { data } = await axios.get('/api/v1/students/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProfile(data);
      } catch (error) {
        showToast('Session expired. Please log in again.', 'error');
        localStorage.removeItem('studentToken');
        setTimeout(() => navigate('/erp/login'), 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!profile) return;
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [notifRes, assignRes, studyRes] = await Promise.all([
          axios.get('/api/v1/notifications/my', config),
          axios.get('/api/v1/assignments/my', config),
          axios.get('/api/v1/study-materials/my', config)
        ]);
        
        setNotifications(notifRes.data);
        setAssignments(assignRes.data);
        setStudyMaterials(studyRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, [profile]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/erp/login'), 1500);
  };

  const handleEditProfile = () => {
    setEditFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address || '',
      password: '',
      confirmPassword: ''
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (editFormData.password && editFormData.password !== editFormData.confirmPassword) {
      return showToast('Passwords do not match', 'error');
    }
    
    try {
      setSavingProfile(true);
      const token = localStorage.getItem('studentToken');
      
      const payload = { ...editFormData };
      if (!payload.password) {
        delete payload.password;
        delete payload.confirmPassword;
      }
      
      const { data } = await axios.put('/api/v1/students/me', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
      if (data.token) {
        localStorage.setItem('studentToken', data.token);
      }
      showToast('Profile updated successfully', 'success');
      setIsEditingProfile(false);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePhotoUpload = async (base64Image) => {
    try {
      const token = localStorage.getItem('studentToken');
      const { data } = await axios.put('/api/v1/students/me', { photo: base64Image }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
      showToast('Profile photo updated', 'success');
    } catch (error) {
      showToast('Failed to update profile photo', 'error');
    }
  };

  const handlePhotoRemove = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const { data } = await axios.put('/api/v1/students/me', { photo: "" }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
      showToast('Profile photo removed', 'success');
    } catch (error) {
      showToast('Failed to remove profile photo', 'error');
    }
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) return null;

  // --- RENDERERS FOR DIFFERENT TABS ---

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Profile Details */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">
              <i className="fas fa-user text-blue-500 mr-2"></i> Personal Profile
            </h2>
            {!isEditingProfile && (
              <button onClick={handleEditProfile} className="text-blue-600 hover:text-blue-800 text-sm">
                <i className="fas fa-edit mr-1"></i> Edit
              </button>
            )}
          </div>

          <div className="mb-6">
             <ProfileImageCropper 
               currentPhoto={profile.photo} 
               onUpload={handlePhotoUpload} 
               onRemove={handlePhotoRemove} 
             />
          </div>
          
          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={editFormData.name} onChange={handleInputChange} required className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} required className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" name="phone" value={editFormData.phone} onChange={handleInputChange} required className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea name="address" value={editFormData.address} onChange={handleInputChange} rows="2" className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Change Password (Optional)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" name="password" value={editFormData.password} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Leave blank to keep current" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={editFormData.confirmPassword} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={savingProfile} className="flex-1 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">{savingProfile ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          ) : (
            <ul className="space-y-4">
              <li>
                <span className="block text-sm text-gray-500">Full Name</span>
                <span className="font-medium text-gray-900">{profile.name}</span>
              </li>
              <li>
                <span className="block text-sm text-gray-500">Email Address</span>
                <span className="font-medium text-gray-900">{profile.email}</span>
              </li>
              <li>
                <span className="block text-sm text-gray-500">Phone Number</span>
                <span className="font-medium text-gray-900">{profile.phone}</span>
              </li>
              <li>
                <span className="block text-sm text-gray-500">Address</span>
                <span className="font-medium text-gray-900">{profile.address || 'Not provided'}</span>
              </li>
              <li className="pt-2">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                  <i className="fas fa-check-circle mr-1"></i> Active Student
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Right Column - Academic Records */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Current Class Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
             <h2 className="text-lg font-bold text-gray-800">
               <i className="fas fa-graduation-cap text-blue-500 mr-2"></i> Academic Status
             </h2>
             <button onClick={() => setActiveTab('reportCard')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Report Card <i className="fas fa-arrow-right ml-1"></i></button>
          </div>
          {profile.currentClass?.className ? (
            <div className="flex flex-wrap gap-6 mb-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Course Enrolled</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100">
                  {profile.currentClass.className}
                </span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Current Semester/Year</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg border border-purple-100">
                  {profile.currentClass.semester}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic mb-4">No academic class assigned yet.</p>
          )}

          {/* Attendance Section */}
          <div className="mt-4 pt-4 border-t border-gray-100">
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-bold text-gray-700">Overall Attendance</span>
               <span className={`text-sm font-bold ${profile.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>{profile.attendance || 0}%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5">
               <div className={`h-2.5 rounded-full ${profile.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(profile.attendance || 0, 100)}%` }}></div>
             </div>
             {profile.attendance < 75 && (
               <p className="text-xs text-red-500 mt-2"><i className="fas fa-exclamation-triangle"></i> Attendance is below the 75% required threshold.</p>
             )}
          </div>
        </div>

        {/* Fee Glimpse */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
             <h2 className="text-lg font-bold text-gray-800">
               <i className="fas fa-rupee-sign text-green-500 mr-2"></i> Fee Summary
             </h2>
             <button onClick={() => setActiveTab('fee')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Full Report <i className="fas fa-arrow-right ml-1"></i></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-3 rounded-lg border">
                <span className="block text-xs text-gray-500 mb-1">Total Fee</span>
                <span className="font-bold text-gray-900">₹{profile.feeDetails?.totalAmount || 0}</span>
             </div>
             <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <span className="block text-xs text-red-500 mb-1">Remaining Dues</span>
                <span className="font-bold text-red-700">₹{(profile.feeDetails?.totalAmount || 0) - (profile.feeDetails?.paidAmount || 0)}</span>
             </div>
          </div>
        </div>

        {/* Recent Notifications Glimpse */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
             <h2 className="text-lg font-bold text-gray-800">
               <i className="fas fa-bell text-yellow-500 mr-2"></i> Recent Notifications
             </h2>
             <button onClick={() => setActiveTab('notifications')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All <i className="fas fa-arrow-right ml-1"></i></button>
          </div>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.slice(0, 2).map(n => (
                <div key={n._id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{n.title}</h3>
                    <span className="text-[10px] text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{n.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No new notifications.</p>
          )}
        </div>

        {/* Recent Assignments Glimpse */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
             <h2 className="text-lg font-bold text-gray-800">
               <i className="fas fa-tasks text-purple-500 mr-2"></i> Recent Assignments
             </h2>
             <button onClick={() => setActiveTab('assignments')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All <i className="fas fa-arrow-right ml-1"></i></button>
          </div>
          {assignments.length > 0 ? (
            <div className="space-y-3">
              {assignments.slice(0, 2).map(a => (
                <div key={a._id} className="p-3 flex justify-between items-center bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{a.title}</h3>
                    <p className="text-[10px] text-gray-400">Assigned: {new Date(a.createdAt).toLocaleDateString()}</p>
                  </div>
                  <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800"><i className="fas fa-download"></i></a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No assignments pending.</p>
          )}
        </div>

      </div>
    </div>
  );

  const renderFee = () => {
    const total = profile.feeDetails?.totalAmount || 0;
    const paid = profile.feeDetails?.paidAmount || 0;
    const remaining = total - paid;
    const lastPaymentDate = profile.feeDetails?.lastPaymentDate ? new Date(profile.feeDetails.lastPaymentDate).toLocaleDateString() : 'N/A';
    const lastPaymentAmount = profile.feeDetails?.lastPaymentAmount || 0;

    return (
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200 text-center max-w-2xl mx-auto mt-4 md:mt-10">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-rupee-sign text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Fee Report</h2>
        <p className="text-gray-500 mb-8">View your fee status and pay your outstanding balance securely.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Total Fee</span>
            <span className="text-xl font-bold text-gray-900">₹{total}</span>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="block text-xs text-green-600 uppercase font-bold mb-1">Total Paid</span>
            <span className="text-xl font-bold text-green-700">₹{paid}</span>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <span className="block text-xs text-red-600 uppercase font-bold mb-1">Remaining</span>
            <span className="text-xl font-bold text-red-700">₹{remaining}</span>
          </div>
        </div>

        <div className="text-left bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8 text-sm">
          <p className="font-semibold text-blue-800 mb-1">Last Payment Details:</p>
          <p className="text-blue-700">Amount: <b>₹{lastPaymentAmount}</b></p>
          <p className="text-blue-700">Date: <b>{lastPaymentDate}</b></p>
        </div>
        
        {remaining > 0 ? (
          <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2 mx-auto">
            <i className="fas fa-credit-card"></i> Pay Now with Razorpay
          </button>
        ) : (
          <div className="inline-block px-6 py-3 bg-green-100 text-green-800 font-bold rounded-lg">
            <i className="fas fa-check-circle mr-2"></i> All Dues Cleared
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-6 mt-4">
          <i className="fas fa-shield-alt mr-1"></i> Payments are 100% secure and encrypted.
        </p>
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800"><i className="fas fa-bell text-blue-500 mr-2"></i> Notifications</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications available.</div>
        ) : (
          notifications.map(n => (
            <div key={n._id} className="p-6 hover:bg-blue-50 transition">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{n.title}</h3>
                <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800"><i className="fas fa-tasks text-purple-500 mr-2"></i> Assignments</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">No assignments assigned yet.</div>
        ) : (
          assignments.map(a => (
            <div key={a._id} className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{a.description}</p>
                <p className="text-xs text-gray-400 mb-4">Assigned on: {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
              <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold rounded transition">
                <i className="fas fa-download mr-1"></i> Download PDF
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderStudyMaterial = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800"><i className="fas fa-book-open text-green-500 mr-2"></i> Study Material</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyMaterials.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">No study material uploaded yet.</div>
        ) : (
          studyMaterials.map(m => (
            <div key={m._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition flex flex-col">
              {m.type === 'youtube' && m.thumbnailUrl ? (
                <div className="h-40 bg-gray-200 relative">
                  <img src={m.thumbnailUrl} alt={m.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <i className="fab fa-youtube text-4xl text-red-600 bg-white rounded-full"></i>
                  </div>
                </div>
              ) : (
                <div className="h-40 bg-blue-50 flex items-center justify-center text-blue-200">
                  <i className={`fas ${m.type === 'pdf' ? 'fa-file-pdf' : 'fa-video'} text-6xl`}></i>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{m.description}</p>
                </div>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold rounded transition text-sm">
                  {m.type === 'pdf' ? 'Download PDF' : 'Watch Video'}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAdmitCard = () => (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200 text-center max-w-2xl mx-auto mt-4 md:mt-10">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fas fa-id-card text-3xl"></i>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Admit Card</h2>
      <p className="text-gray-500 mb-8">Download your examination admit card in A4 PDF format.</p>
      
      {profile.admitCardUrl ? (
        <a href={profile.admitCardUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition inline-flex items-center justify-center gap-2 mx-auto">
          <i className="fas fa-file-pdf"></i> Download Admit Card
        </a>
      ) : (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <i className="fas fa-exclamation-triangle mr-2"></i> Your admit card has not been generated or uploaded yet. Please contact administration.
        </div>
      )}
    </div>
  );

  const renderReportCard = () => (
    <div className="space-y-8">
      {/* Current Semester Marks (if any) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
          <span><i className="fas fa-chart-line text-blue-500 mr-2"></i> Current Semester: {profile.currentClass?.semester || 'N/A'}</span>
        </h2>
        
        {profile.currentClass?.marks && profile.currentClass.marks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="p-3 font-semibold text-gray-600 text-sm">Subject Name</th>
                  <th className="p-3 font-semibold text-gray-600 text-sm text-center whitespace-nowrap">Max Marks</th>
                  <th className="p-3 font-semibold text-gray-600 text-sm text-center whitespace-nowrap">Marks Obtained</th>
                  <th className="p-3 font-semibold text-gray-600 text-sm text-center">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {profile.currentClass.marks.map((mark, idx) => {
                  const percentage = ((mark.obtainedMarks / mark.totalMarks) * 100).toFixed(1);
                  let colorClass = "text-green-600";
                  if (percentage < 40) colorClass = "text-red-600";
                  else if (percentage < 60) colorClass = "text-yellow-600";

                  return (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="p-3 text-gray-800 font-medium">{mark.subject}</td>
                      <td className="p-3 text-center text-gray-500">{mark.totalMarks}</td>
                      <td className="p-3 text-center font-bold text-gray-900">{mark.obtainedMarks}</td>
                      <td className={`p-3 text-center font-bold ${colorClass}`}>
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No marks uploaded for the current semester.</p>
          </div>
        )}
      </div>

      {/* Past Semesters */}
      {profile.semesters && profile.semesters.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
            <i className="fas fa-history text-gray-500 mr-2"></i> Past Semesters Report Cards
          </h2>
          
          <div className="space-y-8">
            {profile.semesters.map((sem, sIdx) => (
              <div key={sIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700">{sem.className} - {sem.semester}</h3>
                </div>
                <div className="overflow-x-auto p-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-gray-200">
                        <th className="p-2 font-semibold text-gray-500 text-xs uppercase">Subject</th>
                        <th className="p-2 font-semibold text-gray-500 text-xs uppercase text-center">Max</th>
                        <th className="p-2 font-semibold text-gray-500 text-xs uppercase text-center">Obtained</th>
                        <th className="p-2 font-semibold text-gray-500 text-xs uppercase text-center">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sem.marks.map((mark, idx) => {
                        const percentage = ((mark.obtainedMarks / mark.totalMarks) * 100).toFixed(1);
                        let colorClass = "text-green-600";
                        if (percentage < 40) colorClass = "text-red-600";
                        else if (percentage < 60) colorClass = "text-yellow-600";

                        return (
                          <tr key={idx}>
                            <td className="p-2 text-gray-800 text-sm font-medium">{mark.subject}</td>
                            <td className="p-2 text-center text-gray-500 text-sm">{mark.totalMarks}</td>
                            <td className="p-2 text-center font-bold text-gray-900 text-sm">{mark.obtainedMarks}</td>
                            <td className={`p-2 text-center font-bold text-sm ${colorClass}`}>
                              {percentage}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-tight">ERP Portal</h2>
          <button className="md:hidden text-gray-400 hover:text-gray-600 transition" onClick={() => setIsSidebarOpen(false)}>
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', icon: 'fa-home', label: 'Dashboard' },
            { id: 'fee', icon: 'fa-rupee-sign', label: 'Fee Report' },
            { id: 'notifications', icon: 'fa-bell', label: 'Notifications' },
            { id: 'assignments', icon: 'fa-tasks', label: 'Assignments' },
            { id: 'studyMaterials', icon: 'fa-book-open', label: 'Study Material' },
            { id: 'admitCard', icon: 'fa-id-card', label: 'Admit Card' },
            { id: 'reportCard', icon: 'fa-chart-bar', label: 'Report Card' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition font-medium ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <i className={`fas ${tab.icon} w-5 text-center`}></i> {tab.label}
              {tab.id === 'notifications' && notifications.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{notifications.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition text-sm font-bold"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center bg-white p-4 shadow-sm border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <button 
              className="md:hidden text-gray-600 hover:text-blue-600 p-2 -ml-2 transition" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg md:text-xl font-bold border-2 border-blue-200 overflow-hidden shrink-0 shadow-inner">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                profile.name.charAt(0)
              )}
            </div>
            
            <div className="truncate">
              <h1 className="text-base md:text-lg font-bold text-gray-900 truncate">
                Welcome, {profile.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-gray-500 truncate">ID: {profile.studentId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setActiveTab('notifications')}
               className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
             >
               <i className="fas fa-bell"></i>
               {notifications.length > 0 && (
                 <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
               )}
             </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'fee' && renderFee()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'assignments' && renderAssignments()}
            {activeTab === 'studyMaterials' && renderStudyMaterial()}
            {activeTab === 'admitCard' && renderAdmitCard()}
            {activeTab === 'reportCard' && renderReportCard()}
          </div>
        </div>

      </main>

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

export default StudentDashboard;

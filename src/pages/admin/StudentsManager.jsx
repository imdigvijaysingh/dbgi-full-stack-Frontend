import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DragDropUpload from '../../components/common/DragDropUpload';

const StudentsManager = () => {
  const [students, setStudents] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    currentClass: {
      className: '',
      semester: '',
      marks: []
    },
    admitCardUrl: '',
    attendance: 0,
    feeDetails: {
      totalAmount: 0,
      paidAmount: 0,
      lastPaymentDate: '',
      lastPaymentAmount: 0
    },
    semesters: [],
    isActive: true
  });

  const [newMark, setNewMark] = useState({ subject: '', totalMarks: 100, obtainedMarks: 0 });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('cms_token');
      const { data } = await axios.get('/api/v1/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(data);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'className' || name === 'semester') {
      setCurrentStudent({
        ...currentStudent,
        currentClass: {
          ...currentStudent.currentClass,
          [name]: value
        }
      });
    } else if (name.startsWith('fee_')) {
      const feeField = name.replace('fee_', '');
      setCurrentStudent({
        ...currentStudent,
        feeDetails: {
          ...currentStudent.feeDetails,
          [feeField]: value
        }
      });
    } else {
      setCurrentStudent({
        ...currentStudent,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleClassSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setCurrentStudent({
        ...currentStudent,
        currentClass: { ...currentStudent.currentClass, className: '', semester: '' }
      });
      return;
    }
    const selectedClass = classesList.find(c => c._id === selectedId);
    if (selectedClass) {
      setCurrentStudent({
        ...currentStudent,
        currentClass: {
          ...currentStudent.currentClass,
          className: selectedClass.courseName,
          semester: selectedClass.semester
        }
      });
    }
  };

  const handleAddMark = () => {
    if (!newMark.subject) return;
    setCurrentStudent({
      ...currentStudent,
      currentClass: {
        ...currentStudent.currentClass,
        marks: [...currentStudent.currentClass.marks, newMark]
      }
    });
    setNewMark({ subject: '', totalMarks: 100, obtainedMarks: 0 });
  };

  const handleRemoveMark = (index) => {
    const updatedMarks = [...currentStudent.currentClass.marks];
    updatedMarks.splice(index, 1);
    setCurrentStudent({
      ...currentStudent,
      currentClass: {
        ...currentStudent.currentClass,
        marks: updatedMarks
      }
    });
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentStudent({
      studentId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      currentClass: {
        className: '',
        semester: '',
        marks: []
      },
      admitCardUrl: '',
      attendance: 0,
      feeDetails: {
        totalAmount: 0,
        paidAmount: 0,
        lastPaymentDate: '',
        lastPaymentAmount: 0
      },
      semesters: [],
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    // password won't be fetched, only set if changing
    setCurrentStudent({
      ...student,
      password: '',
      currentClass: student.currentClass || { className: '', semester: '', marks: [] },
      attendance: student.attendance || 0,
      feeDetails: student.feeDetails || { totalAmount: 0, paidAmount: 0, lastPaymentDate: '', lastPaymentAmount: 0 },
      admitCardUrl: student.admitCardUrl || '',
      semesters: student.semesters || []
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('cms_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (isEditing) {
        // Remove empty password so it's not updated to blank
        const updateData = { ...currentStudent };
        if (!updateData.password) delete updateData.password;

        await axios.put(`/api/v1/students/${currentStudent._id}`, updateData, config);
        toast.success('Student updated successfully');
      } else {
        await axios.post('/api/v1/students', currentStudent, config);
        toast.success('Student added successfully');
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save student');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const token = localStorage.getItem('cms_token');
        await axios.delete(`/api/v1/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Student deleted');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Students & ERP Manager</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded shadow hover:bg-blue-700 transition whitespace-nowrap text-sm md:text-base flex-shrink-0"
        >
          <i className="fas fa-plus mr-1 md:mr-2"></i> Add Student
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Student ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Course/Class</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.currentClass?.className} ({student.currentClass?.semester})
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(student)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <i className="fas fa-edit"></i> Edit/Marks
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No students found. Add a student to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Student & Academic Record' : 'Add New Student'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / Roll No</label>
                      <input
                        type="text"
                        name="studentId"
                        value={currentStudent.studentId}
                        onChange={handleInputChange}
                        required
                        disabled={isEditing} // Cannot change ID after creation
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={currentStudent.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={currentStudent.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={currentStudent.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password {isEditing && <span className="text-xs text-gray-400">(Leave blank to keep current)</span>}</label>
                      <input
                        type="password"
                        name="password"
                        value={currentStudent.password}
                        onChange={handleInputChange}
                        required={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mt-4 border-b pb-1 mb-2">ERP Features</h4>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Admit Card</label>
                        <DragDropUpload 
                          accept="image/*"
                          label="Drag & drop Admit Card image here"
                          onUploadSuccess={(url) => setCurrentStudent({ ...currentStudent, admitCardUrl: url })}
                        />
                        {currentStudent.admitCardUrl && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Preview:</p>
                            {currentStudent.admitCardUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                              <img src={currentStudent.admitCardUrl} alt="Admit Card Preview" className="h-24 w-auto rounded border border-gray-200 shadow-sm object-cover" />
                            ) : (
                              <iframe src={currentStudent.admitCardUrl} title="Admit Card Preview" className="h-24 w-full rounded border border-gray-200 shadow-sm overflow-hidden" />
                            )}
                          </div>
                        )}
                      </div>
                      
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Fee Amount</label>
                      <input
                        type="number"
                        name="fee_totalAmount"
                        value={currentStudent.feeDetails?.totalAmount || 0}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                      />

                      <label className="block text-sm font-medium text-gray-700 mb-1">Paid Fee Amount</label>
                      <input
                        type="number"
                        name="fee_paidAmount"
                        value={currentStudent.feeDetails?.paidAmount || 0}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">Overall Attendance (%)</label>
                      <input
                        type="number"
                        name="attendance"
                        value={currentStudent.attendance || 0}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={currentStudent.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        id="isActive"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                        Active Account
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Academic Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
                      <select
                        required
                        value={classesList.find(c => c.courseName === currentStudent.currentClass.className && c.semester === currentStudent.currentClass.semester)?._id || ''}
                        onChange={handleClassSelect}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select a class...</option>
                        {classesList.map(c => (
                          <option key={c._id} value={c._id}>
                            {c.courseName} - {c.semester}
                          </option>
                        ))}
                      </select>
                      {(!classesList || classesList.length === 0) && (
                        <p className="text-xs text-red-500 mt-1">No active classes found. Please add them in the Classes Manager.</p>
                      )}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Marks / Grades Management</h4>
                      <div className="bg-gray-50 p-4 rounded border mb-4">
                        <div className="flex gap-2 mb-3">
                          <input 
                            type="text" 
                            placeholder="Subject Name"
                            value={newMark.subject}
                            onChange={(e) => setNewMark({...newMark, subject: e.target.value})}
                            className="w-1/2 px-2 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            type="number" 
                            placeholder="Max"
                            value={newMark.totalMarks}
                            onChange={(e) => setNewMark({...newMark, totalMarks: parseInt(e.target.value)})}
                            className="w-1/4 px-2 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            type="number" 
                            placeholder="Obtained"
                            value={newMark.obtainedMarks}
                            onChange={(e) => setNewMark({...newMark, obtainedMarks: parseInt(e.target.value)})}
                            className="w-1/4 px-2 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <button type="button" onClick={handleAddMark} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium transition flex items-center justify-center gap-2">
                          <i className="fas fa-plus text-sm"></i> Add Mark
                        </button>
                      </div>

                      {/* Marks List */}
                      {currentStudent.currentClass.marks.length > 0 && (
                        <div className="border rounded overflow-hidden text-sm">
                          <table className="w-full text-left">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2">Subject</th>
                                <th className="p-2">Max</th>
                                <th className="p-2">Obtained</th>
                                <th className="p-2"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentStudent.currentClass.marks.map((mark, idx) => (
                                <tr key={idx} className="border-t">
                                  <td className="p-2">{mark.subject}</td>
                                  <td className="p-2">{mark.totalMarks}</td>
                                  <td className="p-2 font-semibold text-blue-600">{mark.obtainedMarks}</td>
                                  <td className="p-2 text-right">
                                    <button type="button" onClick={() => handleRemoveMark(idx)} className="text-red-500 hover:text-red-700">
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded shadow-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                >
                  {isEditing ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ErpAttendanceManager = () => {
  const { showToast, showLoading, hideLoading } = useOutletContext();
  const [classesList, setClassesList] = useState([]);
  
  // Selection states
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [month, setMonth] = useState('');
  
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // { studentId: { totalClasses, attendedClasses } }

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const handleFetchStudents = async () => {
    if (!selectedClass || !subject || !month) {
      showToast('Please select Class, Subject, and Month first.', 'error');
      return;
    }

    try {
      showLoading('Fetching students...');
      const token = localStorage.getItem('cms_token');
      const { data } = await axios.get(`/api/v1/attendance/students?classString=${encodeURIComponent(selectedClass)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStudents(data);
      
      // Initialize attendance data from existing records if any
      const initialData = {};
      data.forEach(student => {
        const existingRecord = student.attendanceRecords?.find(
          r => r.subject === subject && r.month === month
        );
        initialData[student._id] = {
          totalClasses: existingRecord ? existingRecord.totalClasses : 0,
          attendedClasses: existingRecord ? existingRecord.attendedClasses : 0
        };
      });
      setAttendanceData(initialData);
      
      if (data.length === 0) {
        showToast('No students found in this class.', 'error');
      }
    } catch (error) {
      showToast('Failed to fetch students', 'error');
    } finally {
      hideLoading();
    }
  };

  const handleInputChange = (studentId, field, value) => {
    const val = parseInt(value) || 0;
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val
      }
    }));
  };

  const handleApplyToAll = (field, value) => {
    const val = parseInt(value) || 0;
    setAttendanceData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(id => {
        newData[id] = { ...newData[id], [field]: val };
      });
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (students.length === 0) return;
    
    // Validate
    for (const id in attendanceData) {
      if (attendanceData[id].attendedClasses > attendanceData[id].totalClasses) {
        showToast('Attended classes cannot be greater than Total classes', 'error');
        return;
      }
    }

    try {
      showLoading('Saving Attendance...');
      const token = localStorage.getItem('cms_token');
      
      const records = students.map(student => ({
        studentId: student._id,
        subject,
        month,
        totalClasses: attendanceData[student._id].totalClasses,
        attendedClasses: attendanceData[student._id].attendedClasses
      }));

      await axios.put('/api/v1/attendance/bulk', { records }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showToast('Attendance saved successfully');
    } catch (error) {
      showToast('Failed to save attendance', 'error');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6"><i className="fas fa-clipboard-user text-blue-500 mr-2"></i> Attendance Manager</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select a class...</option>
              {classesList.map(c => (
                <option key={c._id} value={`${c.courseName} - ${c.semester}`}>
                  {c.courseName} - {c.semester}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Data Structures" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month / Session</label>
            <input 
              type="text" 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. August 2026" 
            />
          </div>
        </div>

        <button 
          onClick={handleFetchStudents}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <i className="fas fa-search mr-2"></i> Fetch Students
        </button>
      </div>

      {students.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Fill Attendance</h2>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              <i className="fas fa-save mr-2"></i> Save All
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 border-b border-blue-100 flex gap-4 items-center flex-wrap">
            <span className="font-semibold text-blue-800 text-sm">Bulk Actions:</span>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                id="bulkTotal"
                placeholder="Total Classes"
                className="w-32 px-3 py-1 border rounded text-sm"
              />
              <button 
                onClick={() => handleApplyToAll('totalClasses', document.getElementById('bulkTotal').value)}
                className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition font-medium"
              >
                Apply to All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600 text-sm">Roll No</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Student Name</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm w-40">Total Classes</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm w-40">Attended Classes</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm w-32">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map(s => {
                  const total = attendanceData[s._id]?.totalClasses || 0;
                  const attended = attendanceData[s._id]?.attendedClasses || 0;
                  const percentage = total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
                  
                  return (
                    <tr key={s._id} className="hover:bg-gray-50 transition">
                      <td className="p-4 text-gray-900 font-medium">{s.studentId}</td>
                      <td className="p-4 text-gray-800">{s.name}</td>
                      <td className="p-4">
                        <input 
                          type="number"
                          min="0"
                          value={total}
                          onChange={(e) => handleInputChange(s._id, 'totalClasses', e.target.value)}
                          className="w-full px-3 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none text-center"
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number"
                          min="0"
                          max={total}
                          value={attended}
                          onChange={(e) => handleInputChange(s._id, 'attendedClasses', e.target.value)}
                          className={`w-full px-3 py-1 border rounded outline-none text-center focus:ring-1 ${attended > total ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                        />
                      </td>
                      <td className="p-4 text-center font-bold">
                        <span className={`${percentage < 75 ? 'text-red-500' : 'text-green-600'}`}>
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErpAttendanceManager;

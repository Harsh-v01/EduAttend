import React, { useState } from 'react';
import { Plus, Edit, Trash2, User, Upload, Camera, Search, Filter, GraduationCap } from 'lucide-react';
import { Student, Class } from '../types';

const StudentManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const classes: Class[] = [
    { id: '1', name: '3rd Year CSE-A', year: 3, department: 'Computer Science', totalStudents: 32 },
    { id: '2', name: '3rd Year CSE-B', year: 3, department: 'Computer Science', totalStudents: 30 },
    { id: '3', name: '2nd Year CSE-A', year: 2, department: 'Computer Science', totalStudents: 38 },
  ];

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', rollNumber: 'CSE001', classId: '1', registered: true },
    { id: '2', name: 'Jane Smith', rollNumber: 'CSE002', classId: '1', registered: true },
    { id: '3', name: 'Mike Johnson', rollNumber: 'CSE003', classId: '1', registered: false },
    { id: '4', name: 'Sarah Wilson', rollNumber: 'CSE004', classId: '1', registered: true },
    { id: '5', name: 'Tom Brown', rollNumber: 'CSE005', classId: '1', registered: false },
    { id: '6', name: 'Alice Davis', rollNumber: 'CSE021', classId: '3', registered: true },
    { id: '7', name: 'Bob Wilson', rollNumber: 'CSE022', classId: '3', registered: true },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    classId: selectedClass,
  });

  const filteredStudents = students.filter(student => 
    student.classId === selectedClass &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedClassData = classes.find(cls => cls.id === selectedClass);
  const registeredCount = filteredStudents.filter(s => s.registered).length;
  const pendingCount = filteredStudents.filter(s => !s.registered).length;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.rollNumber) {
      const student: Student = {
        id: Date.now().toString(),
        name: newStudent.name,
        rollNumber: newStudent.rollNumber,
        classId: newStudent.classId,
        image: previewUrl,
        registered: !!selectedFile,
      };
      setStudents([...students, student]);
      setNewStudent({ name: '', rollNumber: '', classId: selectedClass });
      setSelectedFile(null);
      setPreviewUrl('');
      setShowAddModal(false);
    }
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Management</h2>
          <p className="text-gray-600">Manage student profiles and face registration for attendance tracking</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Class Selection and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            {selectedClassData && (
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Department:</span>
                  <span className="font-medium">{selectedClassData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="font-medium">{selectedClassData.year}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{filteredStudents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Registered</p>
                <p className="text-3xl font-bold text-green-600">{registeredCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedClassData?.name} Students
          </h3>
          <p className="text-sm text-gray-600 mt-1">{filteredStudents.length} students found</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {student.image ? (
                    <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-500">{student.rollNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  student.registered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {student.registered ? 'Registered' : 'Pending'}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeStudent(student.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roll number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={newStudent.classId}
                    onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Face Photo</label>
                
                {!previewUrl ? (
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Upload Photo</span>
                    </button>
                    
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl('');
                        setSelectedFile(null);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setPreviewUrl('');
                  setSelectedFile(null);
                  setNewStudent({ name: '', rollNumber: '', classId: selectedClass });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                disabled={!newStudent.name || !newStudent.rollNumber}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
import React, { useState, useRef } from 'react';
import { Upload, Camera, User, Plus, Trash2, Save, Eye } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  image: string;
  registered: boolean;
}

const StudentRegistration: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', studentId: 'ST001', image: '', registered: true },
    { id: '2', name: 'Jane Smith', studentId: 'ST002', image: '', registered: true },
    { id: '3', name: 'Mike Johnson', studentId: 'ST003', image: '', registered: false },
  ]);
  
  const [newStudent, setNewStudent] = useState({ name: '', studentId: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        setShowWebcam(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = webcamRef.current.videoWidth;
        canvas.height = webcamRef.current.videoHeight;
        context.drawImage(webcamRef.current, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            stopWebcam();
          }
        });
      }
    }
  };

  const stopWebcam = () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const stream = webcamRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setShowWebcam(false);
    }
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.studentId) {
      const student: Student = {
        id: Date.now().toString(),
        name: newStudent.name,
        studentId: newStudent.studentId,
        image: previewUrl,
        registered: !!selectedFile,
      };
      setStudents([...students, student]);
      setNewStudent({ name: '', studentId: '' });
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h2>
        <p className="text-gray-600">Register student faces for automatic attendance tracking</p>
      </div>

      {/* Add New Student Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter student name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={newStudent.studentId}
                onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter student ID"
              />
            </div>
          </div>

          {/* Photo Capture */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Face Photo</label>
            
            {!showWebcam && !previewUrl && (
              <div className="flex space-x-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload Photo</span>
                </button>
                
                <button
                  onClick={startWebcam}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-sm">Use Webcam</span>
                </button>
              </div>
            )}

            {showWebcam && (
              <div className="space-y-4">
                <video
                  ref={webcamRef}
                  autoPlay
                  className="w-full h-48 bg-gray-100 rounded-lg object-cover"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">Capture</span>
                  </button>
                  <button
                    onClick={stopWebcam}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {previewUrl && (
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

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={addStudent}
            disabled={!newStudent.name || !newStudent.studentId}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registered Students</h3>
          <p className="text-sm text-gray-600 mt-1">{students.length} students registered</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {students.map((student) => (
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
                  <p className="text-sm text-gray-500">{student.studentId}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  student.registered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.registered ? 'Registered' : 'Pending'}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Eye className="w-4 h-4" />
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
    </div>
  );
};

export default StudentRegistration;
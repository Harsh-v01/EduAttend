import React, { useState } from 'react';
import { Upload, Camera, Play, CheckCircle, XCircle, User, Clock, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import { Class, Subject, TimeSlot } from '../types';

interface DetectedStudent {
  id: string;
  name: string;
  rollNumber: string;
  confidence: number;
  present: boolean;
  detected: boolean;
}

const AttendanceCapture: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState<DetectedStudent[]>([]);

  const classes: Class[] = [
    { id: '1', name: '3rd Year CSE-A', year: 3, department: 'Computer Science', totalStudents: 32 },
    { id: '2', name: '3rd Year CSE-B', year: 3, department: 'Computer Science', totalStudents: 30 },
    { id: '3', name: '2nd Year CSE-A', year: 2, department: 'Computer Science', totalStudents: 38 },
  ];

  const subjects: Subject[] = [
    { id: '1', name: 'Machine Learning', code: 'CS301', credits: 4, teacher: 'Dr. Smith' },
    { id: '2', name: 'Database Systems', code: 'CS302', credits: 3, teacher: 'Prof. Johnson' },
    { id: '3', name: 'Computer Networks', code: 'CS303', credits: 3, teacher: 'Dr. Brown' },
    { id: '4', name: 'Data Structures', code: 'CS201', credits: 4, teacher: 'Prof. Davis' },
  ];

  const timeSlots: TimeSlot[] = [
    {
      id: '1',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Monday',
      subject: subjects[0],
      classId: '1',
      room: 'Room 101'
    },
    {
      id: '2',
      startTime: '10:45',
      endTime: '12:15',
      day: 'Monday',
      subject: subjects[1],
      classId: '1',
      room: 'Room 102'
    },
    {
      id: '3',
      startTime: '14:00',
      endTime: '15:30',
      day: 'Tuesday',
      subject: subjects[2],
      classId: '1',
      room: 'Room 103'
    },
  ];

  const mockDetectedStudents: DetectedStudent[] = [
    { id: '1', name: 'John Doe', rollNumber: 'CSE001', confidence: 95.2, present: true, detected: true },
    { id: '2', name: 'Jane Smith', rollNumber: 'CSE002', confidence: 89.7, present: true, detected: true },
    { id: '3', name: 'Mike Johnson', rollNumber: 'CSE003', confidence: 0, present: false, detected: false },
    { id: '4', name: 'Sarah Wilson', rollNumber: 'CSE004', confidence: 92.1, present: true, detected: true },
    { id: '5', name: 'Tom Brown', rollNumber: 'CSE005', confidence: 0, present: false, detected: false },
  ];

  const filteredTimeSlots = timeSlots.filter(slot => slot.classId === selectedClass);
  const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
  const selectedClassData = classes.find(cls => cls.id === selectedClass);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessingComplete(false);
      setDetectedStudents([]);
    }
  };

  const processAttendance = async () => {
    if (!selectedFile || !selectedTimeSlot) return;

    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDetectedStudents(mockDetectedStudents);
    setIsProcessing(false);
    setProcessingComplete(true);
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', {
      classId: selectedClass,
      timeSlotId: selectedTimeSlot,
      attendance: detectedStudents
    });
    alert('Attendance saved successfully!');
  };

  const presentCount = detectedStudents.filter(s => s.present).length;
  const absentCount = detectedStudents.filter(s => !s.present).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mark Attendance</h2>
        <p className="text-gray-600">Select class and time slot, then upload classroom media to automatically detect and mark attendance</p>
      </div>

      {/* Class and Time Slot Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Class & Time Slot</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedTimeSlot('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            {selectedClassData && (
              <p className="text-sm text-gray-500 mt-1">
                {selectedClassData.totalStudents} students • {selectedClassData.department}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!selectedClass}
            >
              <option value="">Select time slot</option>
              {filteredTimeSlots.map(slot => (
                <option key={slot.id} value={slot.id}>
                  {slot.startTime} - {slot.endTime} | {slot.subject.name} ({slot.subject.code})
                </option>
              ))}
            </select>
            {selectedSlot && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">{selectedSlot.subject.name}</span>
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-700">{selectedSlot.room}</span>
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-700">{selectedSlot.subject.teacher}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Classroom Media</h3>
        
        {!previewUrl ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">Upload classroom photo or video</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG, MP4, MOV (Max 50MB)</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>Choose File</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedFile?.type.startsWith('image/') ? (
              <img
                src={previewUrl}
                alt="Classroom preview"
                className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-full max-h-96 rounded-lg border border-gray-200"
              />
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p className="font-medium">{selectedFile?.name}</p>
                <p>{selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setProcessingComplete(false);
                    setDetectedStudents([]);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Remove
                </button>
                
                {!processingComplete && (
                  <button
                    onClick={processAttendance}
                    disabled={isProcessing || !selectedTimeSlot}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Process Attendance</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Processing Results */}
      {processingComplete && detectedStudents.length > 0 && selectedSlot && (
        <div className="space-y-6">
          {/* Session Info */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Attendance Session</h3>
                <div className="space-y-1 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{selectedClassData?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{selectedSlot.subject.name} ({selectedSlot.subject.code})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{presentCount}/{detectedStudents.length}</div>
                <div className="text-blue-100 text-sm">Present</div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{detectedStudents.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Present</p>
                  <p className="text-3xl font-bold text-green-600">{presentCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Absent</p>
                  <p className="text-3xl font-bold text-red-600">{absentCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Attendance Results</h3>
                <p className="text-sm text-gray-600 mt-1">Face detection completed with confidence scores</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
                <Clock className="w-4 h-4 ml-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {detectedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.present
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.present ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Present
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Absent
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.detected ? (
                          <span className="font-medium">{student.confidence.toFixed(1)}%</span>
                        ) : (
                          <span className="text-gray-400">Not detected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={saveAttendance}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Attendance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCapture;
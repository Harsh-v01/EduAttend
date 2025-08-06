import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, TrendingUp, Users, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { Class, Subject, AttendanceRecord } from '../types';

const AttendanceReports: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('30days');
  const [searchTerm, setSearchTerm] = useState('');

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

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      date: '2025-01-21',
      timeSlotId: '1',
      classId: '1',
      subjectId: '1',
      totalStudents: 32,
      presentStudents: 28,
      absentStudents: 4,
      attendanceRate: 87.5,
      processedAt: '2025-01-21T09:00:00Z'
    },
    {
      id: '2',
      date: '2025-01-20',
      timeSlotId: '2',
      classId: '1',
      subjectId: '2',
      totalStudents: 32,
      presentStudents: 30,
      absentStudents: 2,
      attendanceRate: 93.8,
      processedAt: '2025-01-20T10:45:00Z'
    },
    {
      id: '3',
      date: '2025-01-19',
      timeSlotId: '3',
      classId: '1',
      subjectId: '3',
      totalStudents: 32,
      presentStudents: 26,
      absentStudents: 6,
      attendanceRate: 81.3,
      processedAt: '2025-01-19T14:00:00Z'
    },
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesClass = record.classId === selectedClass;
    const matchesSubject = !selectedSubject || record.subjectId === selectedSubject;
    const matchesSearch = !searchTerm || 
      subjects.find(s => s.id === record.subjectId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subjects.find(s => s.id === record.subjectId)?.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesSubject && matchesSearch;
  });

  const selectedClassData = classes.find(cls => cls.id === selectedClass);
  const totalClasses = filteredRecords.length;
  const averageAttendance = filteredRecords.reduce((sum, record) => sum + record.attendanceRate, 0) / totalClasses || 0;
  const totalPresent = filteredRecords.reduce((sum, record) => sum + record.presentStudents, 0);

  const exportReport = () => {
    const csvContent = [
      ['Date', 'Subject', 'Subject Code', 'Total Students', 'Present', 'Absent', 'Attendance Rate'],
      ...filteredRecords.map(record => {
        const subject = subjects.find(s => s.id === record.subjectId);
        return [
          record.date,
          subject?.name || '',
          subject?.code || '',
          record.totalStudents.toString(),
          record.presentStudents.toString(),
          record.absentStudents.toString(),
          `${record.attendanceRate}%`
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${selectedClassData?.name}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance Reports</h2>
          <p className="text-gray-600">Generate and analyze attendance reports across classes and subjects</p>
        </div>
        <button
          onClick={exportReport}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 3 months</option>
              <option value="semester">This Semester</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Classes</p>
              <p className="text-3xl font-bold text-gray-900">{totalClasses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg. Attendance</p>
              <p className="text-3xl font-bold text-green-600">{averageAttendance.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Present</p>
              <p className="text-3xl font-bold text-blue-600">{totalPresent}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Class Strength</p>
              <p className="text-3xl font-bold text-purple-600">{selectedClassData?.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedClassData?.name} Attendance Report
          </h3>
          <p className="text-sm text-gray-600 mt-1">{filteredRecords.length} records found</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const subject = subjects.find(s => s.id === record.subjectId);
                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{subject?.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{subject?.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {record.presentStudents}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {record.absentStudents}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              record.attendanceRate >= 90
                                ? 'bg-gradient-to-r from-green-400 to-green-600'
                                : record.attendanceRate >= 75
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                                : 'bg-gradient-to-r from-red-400 to-red-600'
                            }`}
                            style={{ width: `${record.attendanceRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{record.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {new Date(record.processedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
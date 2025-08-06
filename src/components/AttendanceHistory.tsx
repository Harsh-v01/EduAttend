import React, { useState } from 'react';
import { Calendar, Clock, Download, Filter, Search, ChevronDown, Users, UserCheck, UserX } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  time: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  attendanceRate: number;
}

const AttendanceHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [sortBy, setSortBy] = useState('date');

  const attendanceRecords: AttendanceRecord[] = [
    { id: '1', date: '2025-01-21', time: '09:00 AM', totalStudents: 32, presentStudents: 28, absentStudents: 4, attendanceRate: 87.5 },
    { id: '2', date: '2025-01-20', time: '09:15 AM', totalStudents: 32, presentStudents: 30, absentStudents: 2, attendanceRate: 93.8 },
    { id: '3', date: '2025-01-19', time: '09:05 AM', totalStudents: 32, presentStudents: 26, absentStudents: 6, attendanceRate: 81.3 },
    { id: '4', date: '2025-01-18', time: '09:10 AM', totalStudents: 32, presentStudents: 29, absentStudents: 3, attendanceRate: 90.6 },
    { id: '5', date: '2025-01-17', time: '09:20 AM', totalStudents: 32, presentStudents: 31, absentStudents: 1, attendanceRate: 96.9 },
    { id: '6', date: '2025-01-16', time: '09:00 AM', totalStudents: 32, presentStudents: 27, absentStudents: 5, attendanceRate: 84.4 },
    { id: '7', date: '2025-01-15', time: '09:12 AM', totalStudents: 32, presentStudents: 25, absentStudents: 7, attendanceRate: 78.1 },
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.date.includes(searchTerm) || 
                         record.time.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const averageAttendance = filteredRecords.reduce((sum, record) => sum + record.attendanceRate, 0) / filteredRecords.length;
  const totalClasses = filteredRecords.length;
  const totalPresent = filteredRecords.reduce((sum, record) => sum + record.presentStudents, 0);

  const exportData = () => {
    const csvContent = [
      ['Date', 'Time', 'Total Students', 'Present', 'Absent', 'Attendance Rate'],
      ...filteredRecords.map(record => [
        record.date,
        record.time,
        record.totalStudents.toString(),
        record.presentStudents.toString(),
        record.absentStudents.toString(),
        `${record.attendanceRate}%`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance History</h2>
          <p className="text-gray-600">View and manage historical attendance records</p>
        </div>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Summary Cards */}
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
              <UserCheck className="w-6 h-6 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600 mb-1">Highest Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.max(...filteredRecords.map(r => r.attendanceRate)).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date or time..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 3 months</option>
              <option value="all">All time</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="date">Sort by Date</option>
              <option value="attendance">Sort by Attendance</option>
              <option value="present">Sort by Present</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
          <p className="text-sm text-gray-600 mt-1">{filteredRecords.length} records found</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{record.time}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{record.totalStudents}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <UserCheck className="w-3 h-3 mr-1" />
                      {record.presentStudents}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <UserX className="w-3 h-3 mr-1" />
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
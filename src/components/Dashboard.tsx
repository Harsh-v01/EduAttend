import React, { useState } from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Clock, GraduationCap, Target, Award, Camera, FileText } from 'lucide-react';

interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  todayClasses: number;
  averageAttendance: number;
}

interface ClassAttendance {
  id: string;
  className: string;
  subject: string;
  time: string;
  present: number;
  total: number;
  rate: number;
}

const Dashboard: React.FC = () => {
  const [stats] = useState<DashboardStats>({
    totalClasses: 8,
    totalStudents: 240,
    todayClasses: 6,
    averageAttendance: 85.2,
  });

  const [todayAttendance] = useState<ClassAttendance[]>([
    { id: '1', className: '3rd Year CSE', subject: 'Machine Learning', time: '09:00 AM', present: 28, total: 32, rate: 87.5 },
    { id: '2', className: '2nd Year CSE', subject: 'Data Structures', time: '10:30 AM', present: 35, total: 38, rate: 92.1 },
    { id: '3', className: '3rd Year CSE', subject: 'Database Systems', time: '02:00 PM', present: 26, total: 32, rate: 81.3 },
    { id: '4', className: '2nd Year CSE', subject: 'Computer Networks', time: '03:30 PM', present: 33, total: 38, rate: 86.8 },
  ]);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Department Dashboard</h2>
          <p className="text-gray-600">Overview of attendance across all classes and subjects</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <span className="font-medium">Academic Year:</span> 2024-25
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Classes"
          value={stats.totalClasses}
          icon={GraduationCap}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          subtitle="Active classes"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-gradient-to-r from-green-500 to-green-600"
          subtitle="Enrolled students"
        />
        <StatCard
          title="Today's Classes"
          value={stats.todayClasses}
          icon={Calendar}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          subtitle="Scheduled today"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${stats.averageAttendance}%`}
          icon={TrendingUp}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          subtitle="This month"
        />
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time attendance tracking for today's classes</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class & Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todayAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{record.className}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{record.subject}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{record.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {record.present}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            record.rate >= 90
                              ? 'bg-gradient-to-r from-green-400 to-green-600'
                              : record.rate >= 75
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                              : 'bg-gradient-to-r from-red-400 to-red-600'
                          }`}
                          style={{ width: `${record.rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{record.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Attendance</h3>
              <p className="text-blue-100 text-sm mb-4">Mark attendance for current class</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors duration-200">
                Start Now
              </button>
            </div>
            <Camera className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">View Timetable</h3>
              <p className="text-green-100 text-sm mb-4">Check today's class schedule</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors duration-200">
                View Schedule
              </button>
            </div>
            <Calendar className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
              <p className="text-purple-100 text-sm mb-4">Export attendance reports</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors duration-200">
                Generate
              </button>
            </div>
            <FileText className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
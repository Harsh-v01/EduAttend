import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Camera, GraduationCap, FileText, Clock } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ClassManagement from './components/ClassManagement';
import TimetableManagement from './components/TimetableManagement';
import AttendanceCapture from './components/AttendanceCapture';
import StudentManagement from './components/StudentManagement';
import AttendanceReports from './components/AttendanceReports';
import { Tab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes' as Tab, label: 'Classes', icon: GraduationCap },
    { id: 'timetable' as Tab, label: 'Timetable', icon: Calendar },
    { id: 'attendance' as Tab, label: 'Mark Attendance', icon: Camera },
    { id: 'students' as Tab, label: 'Students', icon: Users },
    { id: 'reports' as Tab, label: 'Reports', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'classes':
        return <ClassManagement />;
      case 'timetable':
        return <TimetableManagement />;
      case 'attendance':
        return <AttendanceCapture />;
      case 'students':
        return <StudentManagement />;
      case 'reports':
        return <AttendanceReports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduAttend Pro</h1>
                <p className="text-sm text-gray-500">Department Attendance Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Computer Science Dept.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
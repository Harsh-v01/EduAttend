import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, BookOpen, MapPin, User } from 'lucide-react';
import { TimeSlot, Class, Subject } from '../types';

const TimetableManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

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

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
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
      day: 'Monday',
      subject: subjects[2],
      classId: '1',
      room: 'Room 103'
    },
    {
      id: '4',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Tuesday',
      subject: subjects[3],
      classId: '3',
      room: 'Room 201'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    day: 'Monday',
    subjectId: '',
    classId: selectedClass,
    room: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlotOptions = [
    '09:00', '10:30', '10:45', '12:15', '14:00', '15:30', '15:45', '17:15'
  ];

  const filteredTimeSlots = timeSlots.filter(slot => 
    slot.classId === selectedClass && slot.day === selectedDay
  );

  const addTimeSlot = () => {
    if (newSlot.startTime && newSlot.endTime && newSlot.subjectId && newSlot.room) {
      const subject = subjects.find(s => s.id === newSlot.subjectId);
      if (subject) {
        const slot: TimeSlot = {
          id: Date.now().toString(),
          startTime: newSlot.startTime,
          endTime: newSlot.endTime,
          day: newSlot.day,
          subject,
          classId: newSlot.classId,
          room: newSlot.room
        };
        setTimeSlots([...timeSlots, slot]);
        setNewSlot({
          startTime: '',
          endTime: '',
          day: 'Monday',
          subjectId: '',
          classId: selectedClass,
          room: ''
        });
        setShowAddModal(false);
      }
    }
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const getCurrentSlot = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    return timeSlots.find(slot => 
      slot.day === currentDay && 
      slot.classId === selectedClass &&
      slot.startTime <= currentTime && 
      slot.endTime >= currentTime
    );
  };

  const currentSlot = getCurrentSlot();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Timetable Management</h2>
          <p className="text-gray-600">Manage class schedules and time slots</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Time Slot</span>
        </button>
      </div>

      {/* Current Class Indicator */}
      {currentSlot && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Class</h3>
              <p className="text-green-100 text-sm mb-1">{currentSlot.subject.name} ({currentSlot.subject.code})</p>
              <p className="text-green-100 text-sm">{currentSlot.startTime} - {currentSlot.endTime} | {currentSlot.room}</p>
            </div>
            <div className="text-right">
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors duration-200">
                Mark Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timetable Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {classes.find(c => c.id === selectedClass)?.name} - {selectedDay}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{filteredTimeSlots.length} classes scheduled</p>
        </div>

        {filteredTimeSlots.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No classes scheduled for this day</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTimeSlots
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((slot) => (
                <div key={slot.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-500">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <h4 className="text-lg font-semibold text-gray-900">{slot.subject.name}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {slot.subject.code}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{slot.subject.teacher}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{slot.room}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{slot.subject.credits} Credits</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeTimeSlot(slot.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors duration-200">
                        Mark Attendance
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add Time Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Time Slot</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <select
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlotOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <select
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlotOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={newSlot.subjectId}
                  onChange={(e) => setNewSlot({ ...newSlot, subjectId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input
                  type="text"
                  value={newSlot.room}
                  onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Room 101"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addTimeSlot}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableManagement;
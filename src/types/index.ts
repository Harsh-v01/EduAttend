export interface Class {
  id: string;
  name: string;
  year: number;
  department: string;
  totalStudents: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  teacher: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
  subject: Subject;
  classId: string;
  room: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  classId: string;
  image?: string;
  registered: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  timeSlotId: string;
  classId: string;
  subjectId: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  attendanceRate: number;
  processedAt: string;
}

export interface AttendanceEntry {
  studentId: string;
  isPresent: boolean;
  confidence?: number;
  detectedAt: string;
}

export type Tab = 'dashboard' | 'classes' | 'timetable' | 'attendance' | 'students' | 'reports';
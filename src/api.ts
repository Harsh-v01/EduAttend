/* Minimal API helper for EduAttend frontend */
const API_URL = (import.meta.env.VITE_API_URL || '') as string;

async function request(path: string, options: RequestInit = {}) {
  const url = `${API_URL.replace(/\/$/, '')}/api${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // Students
  listStudents: () => request('/students', { method: 'GET' }),
  addStudent: (payload: { name: string; roll: string }) =>
    request('/students', { method: 'POST', body: JSON.stringify(payload) }),

  // Classes
  listClasses: () => request('/classes', { method: 'GET' }),
  addClass: (payload: { name: string; code: string }) =>
    request('/classes', { method: 'POST', body: JSON.stringify(payload) }),

  // Attendance
  markAttendance: (payload: { date: string; classId: string; presentStudentIds: string[] }) =>
    request('/attendance', { method: 'POST', body: JSON.stringify(payload) }),
  getAttendanceByDate: (date: string) => request(`/attendance/${date}`, { method: 'GET' }),
};
export type Api = typeof api;
export default api;

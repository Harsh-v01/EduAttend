const { readDb, writeDb } = require('./_db');

function normalizeDate(dateStr) {
  // expect YYYY-MM-DD
  return dateStr;
}

exports.getAttendanceByDate = (req, res) => {
  const date = normalizeDate(req.params.date);
  const db = readDb();
  const attendance = (db.attendance && db.attendance[date]) || [];
  res.json(attendance);
};

exports.markAttendance = (req, res) => {
  const { date, classId, presentStudentIds } = req.body;
  if (!date || !classId || !Array.isArray(presentStudentIds)) {
    return res.status(400).json({ error: 'date, classId, presentStudentIds required' });
  }
  const db = readDb();
  db.attendance = db.attendance || {};
  db.attendance[normalizeDate(date)] = db.attendance[normalizeDate(date)] || [];
  // store a single record per class per date (simple)
  const record = { classId, presentStudentIds, timestamp: new Date().toISOString() };
  db.attendance[normalizeDate(date)] = db.attendance[normalizeDate(date)].filter(r => r.classId !== classId);
  db.attendance[normalizeDate(date)].push(record);
  writeDb(db);
  res.status(201).json(record);
};

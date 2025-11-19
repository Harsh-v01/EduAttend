const { readDb, writeDb } = require('./_db');
const { v4: uuidv4 } = require('uuid');

exports.listStudents = (req, res) => {
  const db = readDb();
  res.json(db.students || []);
};

exports.addStudent = (req, res) => {
  const { name, roll } = req.body;
  if (!name || !roll) {
    return res.status(400).json({ error: 'name and roll are required' });
  }
  const db = readDb();
  const student = { id: uuidv4(), name, roll };
  db.students = db.students || [];
  db.students.push(student);
  writeDb(db);
  res.status(201).json(student);
};

const { readDb, writeDb } = require('./_db');
const { v4: uuidv4 } = require('uuid');

exports.listClasses = (req, res) => {
  const db = readDb();
  res.json(db.classes || []);
};

exports.addClass = (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) {
    return res.status(400).json({ error: 'name and code are required' });
  }
  const db = readDb();
  const cls = { id: uuidv4(), name, code };
  db.classes = db.classes || [];
  db.classes.push(cls);
  writeDb(db);
  res.status(201).json(cls);
};

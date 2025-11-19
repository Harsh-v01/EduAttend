const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const studentsRouter = require('./routes/students');
const classesRouter = require('./routes/classes');
const attendanceRouter = require('./routes/attendance');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/students', studentsRouter);
app.use('/api/classes', classesRouter);
app.use('/api/attendance', attendanceRouter);

// simple health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});

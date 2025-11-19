const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.get('/:date', controller.getAttendanceByDate); // date = YYYY-MM-DD
router.post('/', controller.markAttendance);

module.exports = router;

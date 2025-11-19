const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');

router.get('/', controller.listStudents);
router.post('/', controller.addStudent);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/classesController');

router.get('/', controller.listClasses);
router.post('/', controller.addClass);

module.exports = router;

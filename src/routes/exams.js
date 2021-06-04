const express = require('express');
const router = express.Router();

const examController = require('../app/controllers/ExamController.js');

router.post('/create', examController.create);
router.get('', examController.getAll);
router.get('/:id', examController.get);
router.get('/:id/edit', examController.edit);
router.put('/:id', examController.update);
router.delete('/:id', examController.delete);

module.exports = router;

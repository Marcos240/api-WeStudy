const express = require('express');
const router = express.Router();

const examController = require('../app/controllers/ExamController.js');

router.post('/create', examController.create);
router.get('', examController.getAll);
router.get('/:id/edit', examController.edit);
router.put('/:id', examController.update);
router.patch('/:id/restore', examController.restore);
router.delete('/:id', examController.destroy);
router.delete('/:id/force', examController.forceDestroy);

module.exports = router;

const express = require('express');
const router = express.Router();

const questionController = require('../app/controllers/QuestionController.js');

router.post('/create', questionController.create);
router.get('', questionController.getAll);
router.get('/:id', questionController.get);
router.get('/:id/edit', questionController.edit);
router.put('/:id', questionController.update);
router.delete('/:id', questionController.delete);

module.exports = router;

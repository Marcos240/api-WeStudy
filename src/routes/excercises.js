const express = require('express');
const router = express.Router();

const exerciseController = require('../app/controllers/ExerciseController.js');


//Phiếu bài tập trắc nghiệm
router.post('/create', exerciseController.create);
router.get('', exerciseController.getAll);
router.get('/:id', exerciseController.get);
router.get('/:id/questions', exerciseController.getAllQuestion);
router.get('/:id/edit', exerciseController.edit);
router.put('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);

module.exports = router;

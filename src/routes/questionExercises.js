const express = require('express');
const router = express.Router();

const questionExerciseController = require('../app/controllers/QuestionExerciseController.js');

//Câu hỏi trong đề thi thử
router.post('/:exerciseId/create', questionExerciseController.create);
router.get('', questionExerciseController.getAll);
router.get('/:id', questionExerciseController.get);
router.get('/:id/edit', questionExerciseController.edit);
router.put('/:id', questionExerciseController.update);
router.delete('/:id', questionExerciseController.delete);

module.exports = router;

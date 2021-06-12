const express = require('express');
const router = express.Router();

const testExamController = require('../app/controllers/TestExamController.js');


//Đề thi thử
router.post('/create', testExamController.create);
router.get('', testExamController.getAll);
router.get('/:id', testExamController.get);
router.get('/:id/edit', testExamController.edit);
router.put('/:id', testExamController.update);
router.delete('/:id', testExamController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();

const sharePostController = require('../app/controllers/SharePostController.js');


//Bài chia sẻ
router.post('/create', sharePostController.create);
router.get('', sharePostController.getAll);
router.get('/:id', sharePostController.get);
router.get('/:id/edit', sharePostController.edit);
router.put('/:id', sharePostController.update);
router.delete('/:id', sharePostController.delete);

module.exports = router;

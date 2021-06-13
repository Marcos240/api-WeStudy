const express = require('express');
const router = express.Router();

const documentController = require('../app/controllers/DocumentController.js');


//Phiếu tài liệu
router.post('/create', documentController.create);
router.get('', documentController.getAll);
router.get('/:id', documentController.get);
router.get('/:id/edit', documentController.edit);
router.put('/:id', documentController.update);
router.delete('/:id', documentController.delete);

module.exports = router;

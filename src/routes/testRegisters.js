const express = require('express');
const router = express.Router();

const testRegisterController = require('../app/controllers/TestRegisterController.js');


//Phiếu đăng ký thi thử
router.post('/:userId/create', testRegisterController.create);
router.delete('/:id', testRegisterController.delete);

module.exports = router;

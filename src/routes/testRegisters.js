const express = require('express');
const router = express.Router();
const authorize = require('../app/middleware/authorize');

const testRegisterController = require('../app/controllers/TestRegisterController.js');


//Phiếu đăng ký thi thử
router.post('/:userId/create', testRegisterController.create);
router.get('/:id', testRegisterController.get);
router.get('/:userId/getAll', testRegisterController.getAll);
router.delete('/:id', authorize.verifyToken, testRegisterController.delete);

module.exports = router;

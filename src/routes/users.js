const  userController= require('../app/controllers/UserController');
const authorize = require('../app/middleware/authorize');
const upload = require('../untils/upload');
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

//Người dùng

router.post('/signup', upload.single('image'), userController.signup);
router.post('/signin', userController.signin);
router.get('/current', authorize.verifyToken, userController.current);
router.put('/update', authorize.verifyToken, userController.update);

module.exports = router;


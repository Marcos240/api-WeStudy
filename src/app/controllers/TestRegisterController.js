const TestRegister = require('../models/TestRegister');
const User = require('../models/User');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');
//Phiếu đăng ký thi thử
class TestRegisterController {

    // [GET] /testRegisters/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestRegister.findById(req.params.id).exec((err, testRegister) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: testRegister
                });
            });
        }
    }

    // [POST] /testRegisters/create
    async create(req, res) {
        const newTestRegister = new TestRegister(req.body);
        const user = await User.findById(req.params.userId);
        newTestRegister.owner = user;
        user.testRegisters.push(newTestRegister._id);
        await user.save();
        const testRegister = new TestRegister(req.body);    
        testRegister.save((err, testRegister) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add testRegister successfully!", data: testRegister });            
        });
    }

    // [DELETE] /testRegisters/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            // //Xóa phiếu đăng ký khỏi danh sách đã đăng ký của User
            // const testRegister = await TestRegister.findById(req.params.id);
            // res.send(testRegister);
            // const user = await User.findById(testRegister.owner);
            // res.send(user);
            // user.testRegisters.pop(testRegister._id);
            // await user.save();
            //Đang lỗi không lấy được idUser

            TestRegister.deleteOne({ _id: req.params.id }, ).exec((err) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success'
            });
            });
        }
    }
}

module.exports = new TestRegisterController();

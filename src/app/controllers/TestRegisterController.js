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

    // [GET] /testRegisters/:userId/getAll
    async getAll(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.userId) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestRegister.find({owner: req.params.userId}).exec((err, testRegister) => {
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
        newTestRegister.save((err, testRegister) => {
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
            //Xóa phiếu đăng ký khỏi danh sách đã đăng ký của User
            const testRegister = await TestRegister.findById(req.params.id);
            const user = await User.findById(testRegister.owner);
            user.testRegisters.pull(testRegister._id);
            await user.save();
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

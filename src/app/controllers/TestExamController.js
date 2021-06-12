const TestExam = require('../models/TestExam');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');
//Đề thi thử
class TestExamController {
    // [GET] /testExams
    getAll(req, res) {
        TestExam.find().exec((err, testExams) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: testExams
            });
        });
    }
    // [GET] /:id/allQuestion
     getAllQuestion(req, res) {
        TestExam.findById(req.params.id).populate('questions').exec((err, testExams) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: testExams.questions
            });
        });
    }

    // [GET] /testExams/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestExam.findById(req.params.id).exec((err, testExam) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: testExam
                });
            });
        }
    }

    // [POST] /testExams/create
    create(req, res) {
        const testExam = new TestExam(req.body);    
        testExam.save((err, testExam) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add testExam successfully!", data: testExam });            
        });
    }

    // [GET] /testExams/:id/edit
    async edit(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestExam.findById(req.params.id).exec((err, testExam) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: testExam
                });
            });
        }
    }

    // [PUT] /testExams/:id
    async update(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestExam.updateOne({ _id: req.params.id }, req.body).exec((err) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: req.body
                });
            });
        }
    }

    // [DELETE] /testExams/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            TestExam.deleteOne({ _id: req.params.id }, ).exec((err) => {
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

module.exports = new TestExamController();

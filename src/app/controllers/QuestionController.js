const Question = require('../models/Question');
const TestExam = require('../models/TestExam');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');

//Câu hỏi trong đề thi thử
class QuestionController {
    // [GET] /questions
    getAll(req, res) {
        Question.find().exec((err, questions) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: questions
            });
        });
    }

    // [GET] /questions/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const question = await Question.findById(req.params.id);
            // check if result is null:
            if (!question) {
                res.status(404).json({ status: 'fail',message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
                return;
            }
            Question.findById(req.params.id).exec((err, question) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: question
                });
            });
          }
    }

    // [POST] /questions/create
    async create(req, res) {        
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.testExamId) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const newQuestion = new Question(req.body);
            const testExam = await TestExam.findById(req.params.testExamId);
            newQuestion.owner = testExam;
            testExam.questions.push(newQuestion._id);
            await testExam.save();
            newQuestion.save((err, newQuestion) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.send({ status: 'success', message: "Add new question successfully!", data: newQuestion });            
            });     
        }  
    }

    // [GET] /questions/:id/edit
    async edit(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            // find a question by id:
            const question = await Question.findById(req.params.id);
            Question.findById(req.params.id).exec((err, question) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: question
                });
            });
        }
    }

    // [PUT] /questions/:id
    async update(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            Question.updateOne({ _id: req.params.id }, req.body).exec((err) => {
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

    // [DELETE] /questions/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const question = await Question.findById(req.params.id);
            const testExam = await TestExam.findById(question.owner);
            testExam.questions.pop(testExam._id);
            await testExam.save();
            Question.deleteOne({ _id: req.params.id }, ).exec((err) => {
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

module.exports = new QuestionController();

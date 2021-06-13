const QuestionTestExam = require('../models/QuestionTestExam');
const TestExam = require('../models/TestExam');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');

//Câu hỏi trong đề thi thử
class QuestionTestExamController {
    // [GET] /questionTestExams
    getAll(req, res) {
        QuestionTestExam.find().exec((err, questionTestExams) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: questionTestExams
            });
        });
    }

    // [GET] /questionTestExams/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const questionTestExam = await QuestionTestExam.findById(req.params.id);
            // check if result is null:
            if (!questionTestExam) {
                res.status(404).json({ status: 'fail',message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
                return;
            }
            QuestionTestExam.findById(req.params.id).exec((err, questionTestExam) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: questionTestExam
                });
            });
          }
    }

    // [POST] /questionTestExams/create
    async create(req, res) {        
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.testExamId) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const newQuestionTestExam = new QuestionTestExam(req.body);
            const testExam = await TestExam.findById(req.params.testExamId);
            newQuestionTestExam.owner = testExam;
            testExam.questions.push(newQuestionTestExam._id);
            await testExam.save();  
            newQuestionTestExam.save((err, newQuestionTestExam) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.send({ status: 'success', message: "Add new questionTestExam successfully!", data: newQuestionTestExam });            
            });     
        }  
    }

    // [GET] /questionTestExams/:id/edit
    async edit(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            // find a questionTestExam by id:
            const questionTestExam = await QuestionTestExam.findById(req.params.id);
            QuestionTestExam.findById(req.params.id).exec((err, questionTestExam) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: questionTestExam
                });
            });
        }
    }

    // [PUT] /questionTestExams/:id
    async update(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            QuestionTestExam.updateOne({ _id: req.params.id }, req.body).exec((err) => {
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

    // [DELETE] /questionTestExams/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const questionTestExam = await QuestionTestExam.findById(req.params.id);
            const testExam = await TestExam.findById(questionTestExam.owner);
            testExam.questions.pull(questionTestExam._id);
            await testExam.save();
            QuestionTestExam.deleteOne({ _id: req.params.id }, ).exec((err) => {
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

module.exports = new QuestionTestExamController();

const Question = require('../models/Question');
const { mongooseToObject } = require('../../untils/mongoose');

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

    async getAllQuestion(req, res) {
        listQuestion = await Question.find().exec((err, questions) => {
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
        // find a question by id:
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

    // [POST] /questions/create
    create(req, res) {
        const question = new Question(req.body);    
        question.save((err, question) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add question successfully!", data: question });            
        });
    }

    // [GET] /questions/:id/edit
    async edit(req, res) {
        // find a question by id:
        const question = await Question.findById(req.params.id);
        // check if result is null:
        if (!question) {
            res.status(404).json({status: 'fail', message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
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

    // [PUT] /questions/:id
    async update(req, res) {
        // find a question by id:
        const question = await Question.findById(req.params.id);
        // check if result is null:
        if (!question) {
            res.status(404).json({status: 'fail', message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
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

    // [DELETE] /questions/:id
    async delete(req, res) {
        // find a question by id:
        const question = await Question.findById(req.params.id);
        // check if result is null:
        if (!question) {
            res.status(404).json({ status: 'fail', message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
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

module.exports = new QuestionController();

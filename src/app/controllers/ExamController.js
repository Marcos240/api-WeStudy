const Exam = require('../models/Exam');
const { mongooseToObject } = require('../../until/mongoose');

class ExamController {
    // [GET] /exams
    getAll(req, res) {
        Exam.find().exec((err, exams) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: exams
            });
        });
    }

    // [GET] /exams/:id
    async get(req, res) {
        // find a exam by id:
        const exam = await Exam.findById(req.params.id);
        // check if result is null:
        if (!exam) {
            res.status(404).json({ message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
        Exam.findById(req.params.id).exec((err, exam) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: exam
            });
        });
    }

    // [POST] /exams/create
    create(req, res) {
        const exam = new Exam(req.body);    
        exam.save((err, exam) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add exam successfully!", data: exam });            
        });
    }

    // [GET] /exams/:id/edit
    async edit(req, res) {
        // find a exam by id:
        const exam = await Exam.findById(req.params.id);
        // check if result is null:
        if (!exam) {
            res.status(404).json({ message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
        Exam.findById(req.params.id).exec((err, exam) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: exam
            });
        });
    }

    // [PUT] /exams/:id
    async update(req, res) {
        // find a exam by id:
        const exam = await Exam.findById(req.params.id);
        // check if result is null:
        if (!exam) {
            res.status(404).json({ message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
        Exam.updateOne({ _id: req.params.id }, req.body).exec((err) => {
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

    // [DELETE] /exams/:id
    async delete(req, res) {
        // find a exam by id:
        const exam = await Exam.findById(req.params.id);
        // check if result is null:
        if (!exam) {
            res.status(404).json({ message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
            return;
        }
        Exam.deleteOne({ _id: req.params.id }).exec((err) => {
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

module.exports = new ExamController();

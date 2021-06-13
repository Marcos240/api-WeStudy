const QuestionExercise = require('../models/QuestionExercise');
const Exercise = require('../models/Exercise');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');

//Câu hỏi trong đề thi thử
class QuestionExerciseController {
    // [GET] /questionExercises
    getAll(req, res) {
        QuestionExercise.find().exec((err, questionExercises) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: questionExercises
            });
        });
    }

    // [GET] /questionExercises/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const question = await QuestionExercise.findById(req.params.id);
            // check if result is null:
            if (!question) {
                res.status(404).json({ status: 'fail',message: 'Không tìm thấy dữ liệu nào với id ' + req.params.id });
                return;
            }
            QuestionExercise.findById(req.params.id).exec((err, question) => {
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

    // [POST] /questionExercises/create
    async create(req, res) {        
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.exerciseId) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const newQuestionExercise = new QuestionExercise(req.body);
            const exercise = await Exercise.findById(req.params.exerciseId);
            newQuestionExercise.owner = exercise;
            exercise.questions.push(newQuestionExercise._id);
            await exercise.save();  
            newQuestionExercise.save((err, newQuestionExercise) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.send({ status: 'success', message: "Add new question successfully!", data: newQuestionExercise });            
            });     
        }  
    }

    // [GET] /questionExercises/:id/edit
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
            const question = await QuestionExercise.findById(req.params.id);
            QuestionExercise.findById(req.params.id).exec((err, question) => {
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

    // [PUT] /questionExercises/:id
    async update(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            QuestionExercise.updateOne({ _id: req.params.id }, req.body).exec((err) => {
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

    // [DELETE] /questionExercises/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            const question = await QuestionExercise.findById(req.params.id);
            const exercise = await Exercise.findById(question.owner);
            exercise.questions.pull(exercise._id);
            await exercise.save();
            QuestionExercise.deleteOne({ _id: req.params.id }, ).exec((err) => {
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

module.exports = new QuestionExerciseController();

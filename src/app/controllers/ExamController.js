const Exam = require('../models/Exam');
const { mongooseToObject } = require('../../until/mongoose');

class ExamController {
    // [GET] /exams
    getAll(req, res, next) {
        Exam.find({})
            .then((exam) =>{
                    res.json(exam);
                }
            )
            .catch(next);
    }

    // [POST] /exams/create
    create(req, res, next) {
        const exam = new Exam(req.body);
    
        exam.save((err, exam) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add exam successfully!" });            
        });
    }

    // [POST] /exams/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const exam = new Exam(req.body);
        exam
            .save()
            .then(() => res.redirect('/me/stored/exams'))
            .catch((error) => {});
    }

    // [GET] /exams/:id/edit
    edit(req, res, next) {
        Exam.findById(req.params.id)
            .then((exam) =>
                res.render('exams/edit', {
                    exam: mongooseToObject(exam),
                }),
            )
            .catch(next);
    }

    // [PUT] /exams/:id
    update(req, res, next) {
        Exam.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/exams'))
            .catch(next);
    }

    // [DELETE] /exams/:id
    destroy(req, res, next) {
        Exam.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /exams/:id/force
    forceDestroy(req, res, next) {
        Exam.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /exams/:id/restore
    restore(req, res, next) {
        Exam.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ExamController();

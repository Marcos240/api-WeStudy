const SharePost = require('../models/SharePost');
const { mongooseToObject } = require('../../untils/mongoose');
var mongoose = require('mongoose');
//Bài chia sẻ
class SharePostController {
    // [GET] /sharePosts
    getAll(req, res) {
        SharePost.find().exec((err, sharePosts) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: sharePosts
            });
        });
    }

    // [GET] /sharePosts/:id
    async get(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            SharePost.findById(req.params.id).exec((err, sharePost) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: sharePost
                });
            });
        }
    }

    // [POST] /sharePosts/create
    create(req, res) {
        const sharePost = new SharePost(req.body);    
        sharePost.save((err, sharePost) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.send({ status: 'success', message: "Add sharePost successfully!", data: sharePost });            
        });
    }

    // [GET] /sharePosts/:id/edit
    async edit(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            SharePost.findById(req.params.id).exec((err, sharePost) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.status(200).send({
                    status: 'success',
                    data: sharePost
                });
            });
        }
    }

    // [PUT] /sharePosts/:id
    async update(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            SharePost.updateOne({ _id: req.params.id }, req.body).exec((err) => {
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

    // [DELETE] /sharePosts/:id
    async delete(req, res) {
        //kiểm tra tính hợp lệ của id            
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) 
        {
            res.status(404).json({ status: 'fail', message: 'id is not a valid ObjectId' });
            return;
        }
        else
        {
            SharePost.deleteOne({ _id: req.params.id }, ).exec((err) => {
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

module.exports = new SharePostController();

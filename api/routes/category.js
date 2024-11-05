const express = require('express');
const router = express.Router();
const Category = require('../module/category');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');

router.post('',checkAuth, (req, res) => {
    console.log(req.body);
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    category.save().then(result => { 
        res.status(201).json({
            new_data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
// get request
router.get('',checkAuth, (req, res) => {
    Category.find().exec().then(result => {
        res.status(200).json({
            category: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
// delete request
router.delete('/:id',checkAuth, (req, res) => {
    console.log(req.params.id);
    Category.findByIdAndRemove(req.params.id).then(result => {
        res.status(200).json({
            msg: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;
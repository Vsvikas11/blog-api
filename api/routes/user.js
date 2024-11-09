const express = require('express');
const router = express.Router();
const User = require('../module/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then(result => {
                res.status(201).json({
                    new_data: result
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    })
})


router.post('/login',(req,res)=>{
    user.find({
        email:req.body.email
    }).then(user=>{
        if(user.length<1){
            return res.status(404).json({
                msg:'user not found'
            })
        }else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(!result){
                    return res.status(401).json({
                        msg:'password matching fail'
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email:user[0].email,
                        name:user[0].name               
                    },'this is mern api token',
                    {
                        expiresIn: '24h'
                    }
                    );
                    res.status(200).json({
                        result:user[0],
                        token:token
                    })
                }
            })
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;
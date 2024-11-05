const express = require('express');
const router = express.Router();
const Blog = require('../routes/blog');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;  
const checkAuth = require('../middleware/checkAuth');

cloudinary.config({
    cloud_name:'dn1xsauin',
    api_key:'872268484823633',
    api_secret:'BuObAoc8xryK2pS1tI8PJtodFhE'
})

// post new blog
router.post('',checkAuth,(req,res)=>{
    // console.log(req,body);
    // console.log(req,files);
    // res.status(200).json({
    //     msg:'ok'
    //})
    console.log(res.body);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        const blog = new Blog({
            _id:new mongoose.Types.ObjectId,
            title:req.body.title,
            description:req.body.description,
            author:req.body.author,
            category:req.body.category,
            photo:result.url 
        })
        blog.save()
        .then(result=>{
            res.status(200).json({
                new_blog:result
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                erroe:err
            })
        })
    })


    
})

// get all blogs

router.get('',(req,res)=>{
    Blog.find().then(result=>{
        res.status(200).json({
            blogs:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// get blog by id
router.get('/:id',(req,res)=>{
    Blog.findById(res.param.id)
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// get by category
router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category})
    .then(result=>{
        res.status(200).json({
            blogs:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err 
        })
    })
})

// get by author
router.get('/author/:author',(req,res)=>{
    Blog.find({author:req.params.author})
    .then(result=>{
        res.status(200).json({
            blogs:result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
//update blog
router.put('/:id',(req,res)=>{
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        Blog.fileOneAndUpload({
            _id:res.param.id},{
        $set:{
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            photo:result.url,
            author:req.body.author
        }

        }).then(result=>{
            res.status(200).json({
                updatedBlog:result
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    })
})


//delete blog
router.delete('/:id',(req,res)=>{
    const imageUrl = req.query.imageUrl;
    console.log(imageUrl);
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];
    console.log(imageName); 

    cloudinary.uploader.destroy(imageName,(err,result)=>{
        console.log(result, err);
        if(err){
            console.log(err);
            res.status(500).json({
                error:err
            })
        }
        Blog.findByIdAndDelete(res.param.id)
        .then(result=>{
            res.status(200).json({
                deletedBlog:result
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    })

})
module.exports = router;
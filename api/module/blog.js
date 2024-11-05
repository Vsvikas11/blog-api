const mongoose = require('mongoose');

blogSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    author:{
        type:String,
        requirerd: true
       
    },
    photo: String
},{timestamps:true}
)

module.exports = mongoose.module('blog',blogSchema);

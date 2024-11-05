const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoryRoutes = require('./api/routes/category');
const bodyParser = require('body-parser');
const blogRoute = require('./api/routes/blog');
const fileUpload =require('express-fileupload');
const userRoute = require('./api/routes/user');


mongoose.connect('mongodb+srv://vks:vsvikas87@vks-blog.ojcgj.mongodb.net/?retryWrites=true&w=majority&appName=vks-blog')
    .then(res => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('./category', categoryRoutes);
app.use('/blog',blogRoute);
app.use('user',userRoute);


app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'blog get bad request'
    })
})
module.exports = app;
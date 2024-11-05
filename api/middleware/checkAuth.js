const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const varify = jwt.verify(token, 'this is mern api token');
        if(token){
            next();
        }
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Auth failed'
        })
    }
}

export default checkAuth;
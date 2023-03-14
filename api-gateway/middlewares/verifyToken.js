const jwt = require('jsonwebtoken')
const { JWT_SECRET} = process.env

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    
    jwt.verify(token, JWT_SECRET, function (error, decoded)  {
        if (error){
            return res.status(403).json({
                status: 403,
                message: error.message
            })
        }

        req.user = decoded
        return next()
    })
}
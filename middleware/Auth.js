
const jwt = require('jsonwebtoken');



const userAuth = async (req, res, next) => {

    try {

        let token = req.headers['x-api-key'] || req.headers['X-api-key']

        if (!token) {

            return res.status(403).send({ status: false, message: `Missing authentication token in request` })
        }

        let decoded = jwt.verify(token, "prakash123");
        
        if (!decoded) {

            return res.status(403).send({ status: false, message: `Invalid authentication token in request` })
        }

        req.userId = decoded.userId;

        next()

    } catch (error) {
        res.status(500).send({ status: false, Error: "Provide Valid token"})
    }
}


module.exports = {

    userAuth
}
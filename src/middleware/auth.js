const jwt = require('jsonwebtoken')
const User = require('../model/user')


const auth = async (req, res, next) => {

    try {

        console.log('req.header',req.header('Authorization'))

        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({
            email: decode.email,
            token
        })

        if (!user) {
            throw new Error()
        }

        req.user = user

        next()
    } catch (error) {
        res.status(401).send({
            error: "Please authenticate user!"
        })
    }

}

module.exports = auth
const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')


router.post('/user', async (req, res) => {

    const user = new User(req.body)

    if (!user) {
        res.status(400).send({
            error: "Please enter valid data!"
        })
    }

    try {
        user.token = user.generteAuthToken()
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "User registration error!"
        })
    }
})

router.get('/user', auth, async (req, res) => {

    res.status(200).send(req.user)

})


router.post('/user/login', async (req, res) => {

    const {
        email,
        password
    } = req.body

    if (!(email && password)) {
        res.status(400).send({
            error: "Please provide email & password!"
        })
    }

    try {
        const user = await User.authenticateUser(email, password)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            error: 'Email or Password is invalid.'
        })
    }
})


module.exports = router
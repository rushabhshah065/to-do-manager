const express = require('express')
const router = new express.Router()
const Task = require('../model/todomodel')


router.get('/todo', async (req, res) => {

    try {
        const allTask = await Task.find()
        return res.status(200).send(allTask)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "TO-DO task are not retrieved due to an error!"
        })
    }

})


router.post('/todo', async (req, res) => {

    const {
        name,
        description
    } = req.body

    if (!(name && description)) {
        return res.status(400).send({
            error: "To do name and description must required!"
        })
    }

    try {

        const todo = new Task({
            name,
            description
        })

        await todo.save()
        res.status(201).send(todo)
    } catch (error) {
        res.status(500).send({
            error: "TO-DO task are not created due to an error!"
        })
    }

})


module.exports = router
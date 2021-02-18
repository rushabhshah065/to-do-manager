const express = require('express')
const router = new express.Router()
const Task = require('../model/todo')


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


router.put('/todo/:id', async (req, res) => {

    const _id = req.params.id
    const {
        name,
        description
    } = req.body

    if (!_id) {
        return res.status(400).send({
            error: "For updte to do id is required!"
        })
    }

    if (!(name || description)) {
        return res.status(400).send({
            error: "For update to do name or description required!"
        })
    }

    try {
        await Task.updateOne({
            _id
        }, {
            ...(name ? {
                name
            } : {}),
            ...(description ? {
                description
            } : {})
        })
        return res.status(200).send("Task updated!")
    } catch (error) {
        res.status(500).send({
            error: "TO-DO task are not updated due to an error!"
        })
    }

})


router.delete('/todo/:id', async (req, res) => {

    const _id = req.params.id

    if (!_id) {
        return res.status(400).send({
            error: "For delete to do id is required!"
        })
    }

    try {

        await Task.deleteOne({
            _id
        })
        return res.status(200).send({
            error: "Task deleted success!"
        })
    } catch (error) {
        res.status(500).send({
            error: "TO-DO task are not deleted due to an error!"
        })
    }

})


module.exports = router
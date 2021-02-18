const express = require('express')
require('./db/mongoose')
const todoRoute = require('./router/todo')


// define app variable
const app = express()
app.use(express.json())
app.use(todoRoute)

app.get('*', (req, res) => {
    res.send("404 Pge not found!")
})


// litsen app on port and strt server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
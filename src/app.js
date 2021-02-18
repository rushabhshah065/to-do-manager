const express = require('express')


// define app variable
const app = express()


app.get('*',(req,res) => {
    res.send("404 Pge not found!")
})


// litsen app on port and strt server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
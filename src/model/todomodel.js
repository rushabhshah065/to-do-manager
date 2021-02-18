const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Task description should be more than six chracters.")
            }
        }
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
}, {
    timestamps: true
})

const TODO = mongoose.model('TODO', todoSchema)

module.exports = TODO
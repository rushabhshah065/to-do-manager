const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {

            if (!validator.isEmail(value)) {
                throw new Error("User email is not valid!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {

            if (value.length < 7) {
                throw new Error("Password length should be greater than 6")
            }

            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not contain password word")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    token: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

userSchema.virtual('TODO', {
    ref: 'TODO',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('save', async function (next) {

    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()

})

userSchema.methods.generteAuthToken = function () {

    const user = this

    const token = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)

    return token

}

userSchema.statics.authenticateUser = async (email, password) => {

    const user = await USER.findOne({
        email
    })

    if (!user) {
        throw new Error('User does not exist!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('User password does not match!')
    }

    return user

}


const USER = mongoose.model('USER', userSchema)

module.exports = USER
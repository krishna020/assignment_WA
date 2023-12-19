const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // Custom validation function to check if the email ends with "@gmail.com"
                return /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(value);
            },
            message: props => `${props.value} is not a valid Gmail address!`
        }
    },
    phone_number: {
        type: Number,
        required: true
    },
    profile_Pics: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updateddAt: {
        type: Date,
        default: Date.now()

    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
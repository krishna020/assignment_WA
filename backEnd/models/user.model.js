const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

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
        unique:true,
        validate: {
            validator: function(value) {
              // Validate that the phone number is a valid number
              // You can customize this validation logic based on your requirements
              const phoneNumberRegex = /^\d{10}$/;
              return phoneNumberRegex.test(value);
            },
            message: props => `${props.value} is not a valid phone number! Please enter a 10-digit number.`,
          },
    },
    profile_Pics: {
        type: String,
        default: ""
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updateddAt: {
        type: Date,
        default: Date.now()

    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashPassword = await bcrypt.hash(this.password, 10)
            this.password = hashPassword
        }
        catch (err) {
            res.status(400).send(err.message)
        }

    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
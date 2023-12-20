const express = require('express')
const router = express.Router();
const userModel = require('../models/user.model')
const { body, validationResult } = require('express-validator')


router.post('/create_user', [

    //validate the name
    body('name').notEmpty().withMessage('please enter the name').isLength({ min: 3 }).withMessage('Name must be 3 character'),
    //validate the email
    body('email').isEmail().withMessage('please enter the email'),
    //validate the password
    body('password').notEmpty().withMessage('please enter the password').isLength({ min: 6 }).withMessage('password must be 6 digit'),
    //confirm password
    // Validate confirm_password
    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
        .withMessage('Passwords do not match'),
    body('phone_number').notEmpty().withMessage('please enter the name').isLength({ min: 10, max: 10 }).withMessage('phone number should be 10 digit'),

], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userDetails = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // confirm_password:req.body.confirm_password,
            phone_number: req.body.phone_number,
            profile_Pics: req.body.profile_Pics

        })
        console.log('before save')
        const saveData = await userDetails.save()
        console.log('after save')
        if (saveData) {

            return res.status(201).json({
                status: true,
                message: 'UserData is created.',
                data: saveData

            })
        }
        else {
            return res.status(400).json({
                status: false,
                message: 'Error during creating the User',

            })
        }

    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            // Duplicate key error (E11000)
            console.log(error)
            return res.status(400).json({ success: false, message: "This email is already registered." });
        }
        if (error.code === 11000 && error.keyPattern.phone_number) {
            console.error('Duplicate phone number error:', error.message);
            return res.status(400).json({ success: false, message: "Duplicate phone number error" });

        }
        else {
            // Other types of errors
            return res.status(500).json({ success: false, message: "Internal server error." });
        }

    }
})

// get user

router.get('/get_user', async (req, res) => {
    try {

        const userData = await userModel.find();
        if (userData.length > 0) {
            res.status(200).json({
                status: true,
                message: 'userData is fetched.',
                data: userData
            })
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Users Not found'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: 'internal server error'
        })
    }
})

module.exports = router
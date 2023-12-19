const express = require('express')
const router = express.Router();
const userData = require('../models/user.model')
const { body, validationResult } = require('express-validator')

router.post('/create_user', [

    //validate the name
    body('name').notEmpty().withMessage('please enter the name'),
    //validate the email
    body('email').isEmail().withMessage('please enter the email'),
    //validate the password
    body('password').notEmpty().withMessage('please enter the password'),
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

], (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userDetails = new userData({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        phone_number: req.body.phone_number,
        profile_Pics: req.body.profile_Pics,

    })
    userDetails.save()
        .then((data) => {
            res.status(201).json({
                status: true,
                message: 'UserData is created.',
                data: userDetails

            })
        })
        .catch((err) => {
            res.status(500).json({
                status: true,
                message: err.message,

            })
        })

})

module.exports = router
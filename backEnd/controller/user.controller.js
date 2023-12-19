const express = require('express')
const router = express.Router();

router.post('create_user', (req, res) => {


    const userData = new userData({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        phone_number: req.body.phone_number,
        profile_Pics: req.body.profile_Pics,

    })
    userData.save()
        .then((data) => {
            res.status(201).json({
                status: true,
                message: 'UserData is created.',
                data: data

            })
        })
        .catch(err)
        {
        res.status(500).json({
            status: true,
            message: err.message,

        })
    }
})
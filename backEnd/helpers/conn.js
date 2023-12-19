const mongoose = require('mongoose')
require('dotenv').config();
const MONGO_URL = process.env.url
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`database is connect to : ${MONGO_URL}`)
    }).catch((err)=>
    {
        console.log(err.message)
    })
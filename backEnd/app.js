const express=require('express')
const app=express();
require('dotenv').config();
require('./helpers/conn')
const PORT=process.env.port
app.listen(PORT,()=>
{
    console.log(`server is connected port ${PORT}`)
})
const express=require('express')
const app=express();
require('dotenv').config();
require('./helpers/conn')
const userRouter=require('./controller/user.controller')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const PORT=process.env.port


//middleware
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api/v1/users',userRouter)

app.listen(PORT,()=>
{
    console.log(`server is connected port ${PORT}`)
})
import express from 'express'
import cors from 'cors'
import colors from 'colors'
import 'dotenv/config'
import mongoose from 'mongoose'
const port =process.env.PORT
const app =express()

mongoose.connect(process.env.MONGO).then(()=>console.log('<<<<<< MongoDB Connected! >>>>>>'.cyan.bold)).catch((error)=>console.log(`Mongodb Error:`.red,error))
app.get('/',(req,res)=>{
    res.send('Server is running!')
})

app.listen(port,()=>console.log(`Server is running on port: ${port}`.yellow))
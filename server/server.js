import express from 'express'
import cors from 'cors'
import colors from 'colors'
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
const port =process.env.PORT || 5000
const app =express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    allowedHeaders:['Content-Type','Authorization','Cookie','X-Custom-Head'],
    methods:['POST','GET','PUT','DELETE','PATCH','OPTIONS'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO).then(()=>console.log('<<<<<< MongoDB Connected! >>>>>>'.cyan.bold)).catch((error)=>console.log(`Mongodb Error:`.red,error))
app.get('/',(req,res)=>{
    res.send('Server is running!')
})

app.listen(port,()=>console.log(`Server is running on port: ${port}`.yellow))
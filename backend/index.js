import express from 'express';
import  connectDB  from './db/connectDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js'
import emailRoute from './routes/email.route.js'
const app = express()

dotenv.config({})

const port = process.env.port || 8000;

connectDB();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: 'https://g-mail-frontend.onrender.com', credentials: true}))

//routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/email", emailRoute)

app.listen(port,()=>{console.log('Server running at 8000')})

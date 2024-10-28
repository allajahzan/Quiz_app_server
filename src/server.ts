import express from "express"
import route from './router/quiz'
import dotenv from 'dotenv'
import mongose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

// app setup
const app = express()
app.use(morgan('dev'))

// cors
app.use(cors())

// env configeration
dotenv.config()

// mongodb connection
mongose.connect(process.env.mongoURL as string)
    .then(res => console.log("connected to mongodb"))
    .catch(err => console.log(err))

// route
app.use(express.json())
app.use("/", route)

// server listen
app.listen(process.env.PORT, () => {
    console.log("server is running on port 5000")
})
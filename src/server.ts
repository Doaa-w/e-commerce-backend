import express, { Application } from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import usersRouter from './routers/users'
import productsRouter from './routers/products'
import ordersRouter from './routers/orders'
import router from './routers/categories'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import {dev} from "./config"
import { connectDB } from './config/db'



const app: Application = express()
const port:number = dev.app.port
// const URL = dev.db.url  as string

app.use(myLogger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', router)



app.listen(port, async () => {
  console.log('Server running http://localhost:' + port)
   connectDB();
})


app.use(apiErrorHandler)

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log('Database is connected')
//   })
//   .catch((err) => {
//     console.log('MongoDB connection error, ', err)
//   })


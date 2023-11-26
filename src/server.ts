import express, { Application } from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import morgan from 'morgan'

import usersRouter from './routers/users'
import productsRouter from './routers/products'
import ordersRouter from './routers/orders'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import {dev} from "./config"
import { connectDB } from './config/db'
import createError from 'http-errors'

// import { config } from 'dotenv'
config()

const app: Application = express()
const port:number = dev.app.port
const URL = dev.db.url  as string

app.use(morgan('dev'))

app.use(myLogger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use('/api/users', usersRouter)
// app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

app.use(apiErrorHandler)

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log('Database is connected')
//   })
//   .catch((err) => {
//     console.log('MongoDB connection error, ', err)
//   })

app.listen(port, async () => {
  console.log('Server running http://localhost:' + port)
   connectDB();
})

// throw Error
// app.use((req, res, next) => {
//   next(createError(404, 'Not Found'))
// })
//  errorHandler muat be the last one
// app.use(apiErrorHandler)

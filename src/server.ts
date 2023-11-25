import express, { Request, Response, NextFunction, Application } from "express";

import { dev } from "./config";
import { connectDB } from './config/db';

import productsRouter from './routers/products';
import usersRouter from './routers/users';
import ordersRouter from './routers/orders';

import apiErrorHandler from './middlewares/errorHandler';
import myLogger from './middlewares/logger';

const app: Application = express();
const port:number = dev.app.port;
// const URL = dev.db.url  as string

app.use(myLogger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hello World!');
  }
  catch(error) {
    next(error);
  }
});

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

app.use(apiErrorHandler);

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
});
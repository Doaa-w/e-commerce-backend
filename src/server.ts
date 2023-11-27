import express, { Request, Response, NextFunction, Application } from "express";

import { dev } from "./config";
import { connectDB } from './config/db';

import usersRouter from './routers/users';
import productsRouter from './routers/products';
import ordersRouter from './routers/orders';
import categoriesRouter from './routers/categories';

import myLogger from './middlewares/logger';
import { createHttpError } from './util/createHttpError';
import { apiErrorHandler } from './middlewares/errorHandler';

const app: Application = express();
const port: number = dev.app.port;

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
app.use('/api/categories', categoriesRouter);

app.use(apiErrorHandler)

app.listen(port, async () => {
  console.log('Server running http://localhost:' + port);
  connectDB();
});

app.use((res, req, next) => {
  const error = createHttpError(404, 'Router no found')
  next(error)
});
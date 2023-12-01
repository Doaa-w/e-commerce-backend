import express, { Application } from 'express';

import { dev } from './config';
import { connectDB } from './config/db';

import authRouter from './routers/auth';
import usersRouter from './routers/users';
import productsRouter from './routers/products';
import ordersRouter from './routers/orders';
import categoriesRouter from './routers/categories';

import myLogger from './middlewares/logger';
import { apiErrorHandler } from './middlewares/errorHandler';
import { createHttpError } from './util/createHttpError';
import cookieParser from 'cookie-parser';

const app: Application = express();
const port: number = dev.app.port;

app.use(myLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);

app.listen(port, async () => {
  console.log('Server running http://localhost:' + port);
  connectDB();
});


// check this
app.use((res, req, next) => {
  const error = createHttpError(404, 'Router no found');
  next(error);
});

app.use(apiErrorHandler);
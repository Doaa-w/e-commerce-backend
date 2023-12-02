import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { dev } from './config';
import { connectDB } from './config/db';

import authRouter from './routers/auth';
import productsRouter from './routers/products';
import usersRouter from './routers/users';
import ordersRouter from './routers/orders';
import categoriesRouter from './routers/categories';

import myLogger from './middlewares/logger';
import { apiErrorHandler } from './middlewares/errorHandler';
import { createHttpError } from './util/createHttpError';

const app: Application = express();
const port: number = dev.app.port;

app.use(myLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);

app.listen(port, async () => {
  console.log('Server running at http://localhost:' + port);
  connectDB();
});

app.use((res, req, next) => {
  const error = createHttpError(404, 'Router no found');
  next(error);
});

app.use(apiErrorHandler);
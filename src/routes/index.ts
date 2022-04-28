import userRouter from './users.route';
import authRouter from './auth.route';
import indexRouter from './index.route';
import express from 'express';

export default(app: express.Application) => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/', indexRouter);
}
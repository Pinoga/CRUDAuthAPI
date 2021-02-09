import { UserRouter } from './user/index';
import express, { Request, Response, NextFunction } from 'express';

export const ApiRouter = express.Router();

// Healthcheck da rota /api
ApiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.locals.statusCode = 200;
	res.locals.data = { msg: 'OK' };
	next();
});

ApiRouter.use('/user', UserRouter);

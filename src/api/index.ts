import express, { Response, Request, NextFunction } from 'express';
import { Sequelize } from 'sequelize';

import configureAuthentication from './authentication';
import { handleResponse } from './response/handler';
import ErrorHandler from './error/handler';
import { ApiRouter } from './routes/index';

import passport from 'passport';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const startServer = (sequelize: Sequelize) => {
	//Inicializa as estratégias de autenticação do Passport
	configureAuthentication();

	const app = express();

	// Middlewares
	app.use(morgan('common'));
	app.use(helmet());
	app.use(cors());
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(passport.initialize());

	// Rota da API
	app.use('/api', ApiRouter);

	//
	app.use((req: any, res: Response, next: NextFunction) => {
		handleResponse(res, null, next);
	});

	app.use((err: ErrorHandler, req: any, res: Response, next: NextFunction) => {
		handleResponse(res, err, next);
	});

	return app;
};

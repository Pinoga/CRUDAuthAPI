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
	app.use(
		cors({
			origin: true,
			// origin: [/.*127\.0\.0\.1.*/, /.*192\.168\.65\.1.*/, /localhost/],
			credentials: true,
			// allowedHeaders: ['Set-Cookie', 'Content-Type'],
		})
	);
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(passport.initialize());

	// Rota da API
	app.use('/api', ApiRouter);

	// Todas as respostas bem-sucedidas passam pelo último middleware para garantir a uniformidade e modularização
	app.use((req: any, res: Response, next: NextFunction) => {
		handleResponse(res, null, next);
	});

	// Todas as respostas de erro também passam pelo middleware de tratamento de erro do express
	app.use((err: ErrorHandler, req: any, res: Response, next: NextFunction) => {
		handleResponse(res, err, next);
	});

	return app;
};

import { NextFunction, Request, Response } from 'express';
import Validator from './validate';
import Schema from './schema';
import Joi, { string } from 'joi';

const userSchema = Schema.user;

// Schemas de validação das rotas da API
const RequestValidator = {
	userId: (req: Request, res: Response, next: NextFunction) => {
		const schema = Joi.object({
			id: userSchema.id.required(),
		});
		Validator.validateRequest(req, next, schema, 'params');
	},
	createUser: (req: Request, res: Response, next: NextFunction) => {
		const schema = Joi.object({
			data: Joi.object()
				.keys({
					firstName: userSchema.firstName,
					lastName: userSchema.lastName,
					email: userSchema.email.required(),
					password: userSchema.password.required(),
				})
				.required(),
		});
		Validator.validateRequest(req, next, schema, 'body');
	},
	updateUser: (req: Request, res: Response, next: NextFunction) => {
		const { id, ...updateUserSchema } = Schema.user;
		const schema = Joi.object({
			data: Joi.object()
				.keys({
					...updateUserSchema,
				})
				.required(),
		});
		Validator.validateRequest(req, next, schema, 'body');
	},
	signIn: (req: Request, res: Response, next: NextFunction) => {
		const schema = Joi.object({
			email: userSchema.email.required(),
			password: userSchema.password.required(),
		});
		Validator.validateRequest(req, next, schema, 'body');
	},
	signUp: (req: Request, res: Response, next: NextFunction) => {
		const schema = Joi.object({
			email: userSchema.email.required(),
			password: userSchema.password.required(),
		});
		Validator.validateRequest(req, next, schema, 'body');
	},
};

export default RequestValidator;

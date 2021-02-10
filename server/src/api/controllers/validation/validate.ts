import { NextFunction } from 'express';
import Joi from 'joi';
import ErrorHandler from '../../error/handler';

export default {
	// Retorno de erro 400 (Bad Request) caso a validação do request falhe
	validateRequest: (
		req: any,
		next: NextFunction,
		schema: Joi.ObjectSchema<any>,
		field: string
	) => {
		const options: Joi.ValidationOptions = {
			abortEarly: false,
			allowUnknown: true,
		};
		console.log(req[field]);
		const { error, value } = schema.validate(req[field], options);

		if (error) {
			next(
				new ErrorHandler(
					400,
					`Validation error: ${error.details.map(e => e.message).join(', ')}`
				)
			);
		} else {
			req[field] = value;
			next();
		}
	},
};
